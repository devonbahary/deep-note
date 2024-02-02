import { NextFunction } from 'express'

export const withErrorHandling = async (
    cb: () => Promise<void>,
    next: NextFunction
) => {
    try {
        await cb()
    } catch (err) {
        next(err)
    }
}
