import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { Note } from '../models/Note'
import { withErrorHandling } from './errorHandling'

const router = Router()

router.get('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const note = await Note.findById(id)

        res.json(note)
    }, next)
})

router.post('/', async (req, res, next) => {
    withErrorHandling(async () => {
        const { folderId } = req.body

        const newNote = await Note.create({
            _folderId: folderId ? new ObjectId(folderId) : undefined,
        })

        res.json(newNote)
    }, next)
})

router.put('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params
        const { content } = req.body

        await Note.updateOne(
            {
                _id: id,
            },
            {
                content,
            }
        )

        res.sendStatus(200)
    }, next)
})

export default router
