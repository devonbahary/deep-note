import { Router } from 'express'
import { withErrorHandling } from './errorHandling'
import {
    createFolder,
    deleteFolder,
    getFolderDescendantsCount,
    getFolderWithChildItems,
    updateFolder,
} from '../services/foldersService'

const router = Router()

router.get('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const folders = await getFolderWithChildItems(id)

        if (!folders.length) {
            res.sendStatus(404)
        }

        res.json(folders[0])
    }, next)
})

router.get('/descendants-count/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const descendantsCount = await getFolderDescendantsCount(id)

        res.json(descendantsCount)
    }, next)
})

router.post('/', async (req, res, next) => {
    withErrorHandling(async () => {
        const { folderId } = req.body

        const newFolder = await createFolder(folderId)

        res.json(newFolder)
    }, next)
})

router.put('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const updatedFolder = await updateFolder(id, req.body)

        if (!updateFolder) {
            res.sendStatus(404)
        }

        res.json(updatedFolder)
    }, next)
})

router.delete('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        await deleteFolder(id)

        res.sendStatus(200)
    }, next)
})

export default router
