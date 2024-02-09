import { Router } from 'express'
import {
    createNote,
    deleteNote,
    getNote,
    updateNote,
} from '../services/notesService'
import { create, destroy, getById, update } from './crudUtility'

const router = Router()

router.get('/:id', async (req, res, next) => {
    await getById(req, res, next, getNote)
})

router.post('/', async (req, res, next) => {
    await create(req, res, next, createNote)
})

router.put('/:id', async (req, res, next) => {
    await update(req, res, next, getNote, updateNote)
})

router.delete('/:id', async (req, res, next) => {
    await destroy(req, res, next, getNote, deleteNote)
})

export default router
