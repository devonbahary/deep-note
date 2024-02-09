import { NextFunction, Request, Response } from 'express'
import { CreateInput, Protected } from '../types/types'
import { getUserId, isAuthorized } from '../authorization/authorization'

type GetById<T> = (id: string) => Promise<T | null>

export const getById = async <T extends Protected>(
    req: Request,
    res: Response,
    next: NextFunction,
    getById: GetById<T>
): Promise<void> => {
    withErrorHandling(async () => {
        const { id } = req.params

        const resource = await getById(id)

        if (!resource) {
            res.sendStatus(404)
        } else if (!isAuthorized(req, resource)) {
            res.sendStatus(403)
        } else {
            res.json(resource)
        }
    }, next)
}

export const create = async <T>(
    req: Request,
    res: Response,
    next: NextFunction,
    create: (input: CreateInput) => Promise<T>
): Promise<void> => {
    withErrorHandling(async () => {
        const { parentFolderId } = req.body
        const userId = getUserId(req)

        const resource = await create({ parentFolderId, userId })

        res.json(resource)
    }, next)
}

// TODO: possible to reparent a resource into a folder not owned by user; revisit this
export const update = async <T, I>(
    req: Request,
    res: Response,
    next: NextFunction,
    getById: GetById<T>,
    update: (id: string, input: I) => Promise<T>
): Promise<void> => {
    withErrorHandling(async () => {
        const { id } = req.params

        const resource = await getById(id)

        if (!resource) {
            res.sendStatus(404)
        } else if (!isAuthorized(req, resource)) {
            res.sendStatus(403)
        } else {
            const updatedResource = await update(id, req.body)
            res.json(updatedResource)
        }
    }, next)
}

export const destroy = async <T>(
    req: Request,
    res: Response,
    next: NextFunction,
    getById: GetById<T>,
    destroy: (id: string) => Promise<void>
): Promise<void> => {
    withErrorHandling(async () => {
        const { id } = req.params

        const resource = await getById(id)

        if (resource && !isAuthorized(req, resource)) {
            res.sendStatus(403)
        }

        await destroy(id)

        res.sendStatus(200)
    }, next)
}

const withErrorHandling = async (
    cb: () => Promise<void>,
    next: NextFunction
) => {
    try {
        await cb()
    } catch (err) {
        next(err)
    }
}
