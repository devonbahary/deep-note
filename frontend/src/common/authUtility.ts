import { User } from '@auth0/auth0-react'
import { Folder } from '../types/Folder'
import { Note } from '../types/Note'

export const belongsToUser = (item: Folder | Note, user: User) => {
    return item.userId === user.sub
}

export const belongsToNoOne = (item: Folder | Note) => {
    return !item.userId
}
