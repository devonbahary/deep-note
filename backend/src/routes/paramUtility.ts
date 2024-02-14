import { Request } from 'express'

export const getQueryStringParam = (
    req: Request,
    param: string
): string | undefined => {
    const parameter = req.query[param]
    if (typeof parameter === 'string') {
        return parameter
    }
    return
}
