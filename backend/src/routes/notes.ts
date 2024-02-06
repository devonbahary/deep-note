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
        const { parentFolderId } = req.body

        const newNote = await createNote(parentFolderId)

        res.json(newNote)
    }, next)
})

router.put('/:id', async (req, res, next) => {
    withErrorHandling(async () => {
        const { id } = req.params

        const updatedNote = await updateNote(id, req.body)

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
