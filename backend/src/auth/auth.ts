import { NextFunction, Request, Response } from 'express'
import { Protected } from '../types/types'

export const getUserId = (req: Request): string | undefined => {
    return req.auth?.payload.sub
}

export const isAuthorized = (req: Request, resource: Protected): boolean => {
    if (resource?.userId) {
        return getUserId(req) === resource.userId
    }

    return true
}

export const assertAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.auth) {
        return res.sendStatus(403)
    }
    next()
}
