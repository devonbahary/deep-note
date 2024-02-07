import { Router } from 'express'
import {
    createFolder,
    deleteFolder,
    getFolderDescendantsCount,
    getFolderWithFamily,
    updateFolder,
} from '../services/foldersService'
import { create, destroy, getById, update } from './crudUtility'

const router = Router()

router.get('/:id', async (req, res, next) => {
    await getById(req, res, next, getFolderWithFamily)
})

router.get('/descendants-count/:id', async (req, res, next) => {
    await getById(req, res, next, getFolderDescendantsCount)
})

router.post('/', async (req, res, next) => {
    await create(req, res, next, createFolder)
})

router.put('/:id', async (req, res, next) => {
    await update(req, res, next, updateFolder)
})

router.delete('/:id', async (req, res, next) => {
    await destroy(req, res, next, deleteFolder)
})

export default router
