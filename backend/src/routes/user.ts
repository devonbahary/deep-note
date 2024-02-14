import { Router } from 'express'
import { updateNoteUserId } from './../services/userService'
import { getFolder } from './../services/foldersService'
import { withErrorHandling } from './crudUtility'
import { getUserId, isAuthorized } from '../authorization/authorization'
import {
    claimFolderAndDescendants,
    getUserRootFolders,
    unclaimFolderAndDescendants,
} from '../services/userService'
import { getQueryStringParam } from './paramUtility'

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

router.put('/claim-folder/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params
        const userId = getUserId(req)

        const folder = await getFolder(id)

        if (!folder) {
            res.sendStatus(404)
        } else if (!userId || !isAuthorized(req, folder)) {
            res.sendStatus(403)
        } else {
            await claimFolderAndDescendants(userId, folder)

            const updatedFolder = await getFolder(id)

            res.json(updatedFolder)
        }
    }, next)
})

router.put('/unclaim-folder/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params
        const userId = getUserId(req)

        const folder = await getFolder(id)

        if (!folder) {
            res.sendStatus(404)
        } else if (!userId || !isAuthorized(req, folder)) {
            res.sendStatus(403)
        } else {
            await unclaimFolderAndDescendants(userId, folder)

            const updatedFolder = await getFolder(id)

            res.json(updatedFolder)
        }
    }, next)
})

router.put('/claim-note/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const userId = getUserId(req)
        await updateNoteUserId(req, res, { userId })
    }, next)
})

router.put('/unclaim-note/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        await updateNoteUserId(req, res, { userId: null })
    }, next)
})

export default router
