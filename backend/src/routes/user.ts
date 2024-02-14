import { Router } from 'express'
import { assertAuthentication } from '../auth/auth'
import { getFolder } from './../services/foldersService'
import { getById, withErrorHandling } from './crudUtility'
import { getUserId } from '../auth/auth'
import {
    claimFolderAndDescendants,
    getUserRootFolders,
    unclaimFolderAndDescendants,
} from '../services/userService'
import { getQueryStringParam } from './paramUtility'
import { getNote } from '../services/notesService'
import { Note } from '../models/Note'

const router = Router()

router.get('/root-folders', async (req, res, next) => {
    withErrorHandling(async () => {
        const unauthenticatedRootFolderId = getQueryStringParam(
            req,
            'unauthenticatedRootFolderId'
        )

        const rootFolders = await getUserRootFolders(
            req,
            unauthenticatedRootFolderId
        )

        res.json(rootFolders)
    }, next)
})

router.put(
    '/claim-folder/:id',
    assertAuthentication,
    async (req, res, next) => {
        getById(req, res, next, getFolder, async (folder) => {
            const userId = getUserId(req)

            if (!userId) {
                res.sendStatus(403)
            } else {
                await claimFolderAndDescendants(userId, folder)

                const updatedFolder = await getFolder(folder._id)

                res.json(updatedFolder)
            }
        })
    }
)

router.put(
    '/unclaim-folder/:id',
    assertAuthentication,
    async (req, res, next) => {
        getById(req, res, next, getFolder, async (folder) => {
            const userId = getUserId(req)

            if (!userId) {
                res.sendStatus(403)
            } else {
                await unclaimFolderAndDescendants(userId, folder)

                const updatedFolder = await getFolder(folder._id)

                res.json(updatedFolder)
            }
        })
    }
)

router.put('/claim-note/:id', assertAuthentication, async (req, res, next) => {
    getById(req, res, next, getNote, async (note) => {
        const userId = getUserId(req)

        const updatedNote = await Note.findOneAndUpdate(
            { _id: note._id },
            { userId },
            { new: true }
        )

        res.json(updatedNote)
    })
})

router.put(
    '/unclaim-note/:id',
    assertAuthentication,
    async (req, res, next) => {
        getById(req, res, next, getNote, async (note) => {
            const updatedNote = await Note.findOneAndUpdate(
                { _id: note._id },
                { userId: null },
                { new: true }
            )

            res.json(updatedNote)
        })
    }
)

export default router
