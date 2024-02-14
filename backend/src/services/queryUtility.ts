import { AnyObject } from 'mongoose'

export const belongsToUserOrNoOne = (userId: string): AnyObject => ({
    $or: [
        {
            userId,
        },
        {
            userId: null,
        },
    ],
})
