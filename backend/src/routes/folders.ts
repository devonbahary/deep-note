import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { Folder } from '../models/Folder'

const router = Router()

router.get('/:id', async (req, res) => {
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
        return res.sendStatus(404)
    }

    res.json(folders[0])
})

router.post('/', async (req, res) => {
    const { folderId } = req.body

    const newFolder = await Folder.create({
        _folderId: folderId ? new ObjectId(folderId) : undefined,
    })

    res.json(newFolder)
})

export default router
