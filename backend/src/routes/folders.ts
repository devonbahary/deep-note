import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { Folder } from '../models/Folder'
import { withErrorHandling } from './errorHandling'

const router = Router()

router.get('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const folders = await Folder.aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'notes',
                    localField: '_id',
                    foreignField: '_folderId',
                    as: 'notes',
                },
            },
            {
                $lookup: {
                    from: 'folders',
                    localField: '_id',
                    foreignField: '_folderId',
                    as: 'folders',
                },
            },
        ])

        if (!folders.length) {
            res.sendStatus(404)
        }

        res.json(folders[0])
    }, next)
})

router.post('/', async (req, res, next) => {
    withErrorHandling(async () => {
        const { folderId } = req.body

        const newFolder = await Folder.create({
            _folderId: folderId ? new ObjectId(folderId) : undefined,
        })

        res.json(newFolder)
    }, next)
})

export default router
