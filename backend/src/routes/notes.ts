import { Router } from 'express'
import { withErrorHandling } from './errorHandling'
import {
    createNote,
    deleteNote,
    getNote,
    updateNote,
} from '../services/notesService'

const router = Router()

router.get('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const note = await getNote(id)

        res.json(note)
    }, next)
})

router.post('/', async (req, res, next) => {
    withErrorHandling(async () => {
        const { folderId } = req.body

        const newNote = await createNote(folderId)

        res.json(newNote)
    }, next)
})

router.put('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params
        const { content, name } = req.body

        const updatedNote = await updateNote(id, { content, name })

        res.json(updatedNote)
    }, next)
})

router.delete('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        await deleteNote(id)

        res.sendStatus(200)
    }, next)
})

export default router
