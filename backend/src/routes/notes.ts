import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { UpdateQuery } from 'mongoose'
import { Note } from '../models/Note'
import { withErrorHandling } from './errorHandling'

type UpdateNoteInput = {
    content?: string
    name?: string
}

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
        const { content, name } = req.body

        const update: UpdateQuery<UpdateNoteInput> = {}

        if (content) {
            update.content = content
        }

        if (name) {
            update.name = name
        }

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
            },
            update,
            {
                new: true,
            }
        )

        res.json(updatedNote)
    }, next)
})

router.delete('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        await Note.deleteOne({
            _id: new ObjectId(id),
        })

        res.sendStatus(200)
    }, next)
})

export default router
