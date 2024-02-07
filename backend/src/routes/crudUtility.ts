import { NextFunction, Request, Response } from 'express'

export const getById = async <T>(
    req: Request,
    res: Response,
    next: NextFunction,
    getById: (id: string) => Promise<T | null>
): Promise<void> => {
    withErrorHandling(async () => {
        const { id } = req.params

        const resource = await getById(id)

        if (!resource) {
            res.sendStatus(404)
        }

        res.json(resource)
    }, next)
}

export const create = async <T>(
    req: Request,
    res: Response,
    next: NextFunction,
    create: (parentFolderId: string) => Promise<T>
): Promise<void> => {
    withErrorHandling(async () => {
        const { parentFolderId } = req.body

        const newNote = await create(parentFolderId)

        res.json(newNote)
    }, next)
}

export const update = async <T, I>(
    req: Request,
    res: Response,
    next: NextFunction,
    update: (id: string, input: I) => Promise<T>
): Promise<void> => {
    withErrorHandling(async () => {
        const { id } = req.params

        const updatedResource = await update(id, req.body)

        if (!updatedResource) {
            res.sendStatus(404)
        }

        res.json(updatedResource)
    }, next)
}

export const destroy = async (
    req: Request,
    res: Response,
    next: NextFunction,
    destroy: (id: string) => Promise<void>
): Promise<void> => {
    withErrorHandling(async () => {
        const { id } = req.params

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
