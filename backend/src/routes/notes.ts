import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { Note } from '../models/Note'

const router = Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const note = await Note.findById(id)

    res.json(note)
})

router.post('/', async (req, res) => {
    const { folderId } = req.body

    const newNote = await Note.create({
        _folderId: folderId ? new ObjectId(folderId) : undefined,
    })

    res.json(newNote)
})

router.put('/:id', async (req, res) => {
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
})

export default router
