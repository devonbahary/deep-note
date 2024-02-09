import { Request } from 'express'
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
