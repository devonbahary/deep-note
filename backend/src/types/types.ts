import { ObjectId } from 'mongoose'

export type Protected = {
    userId?: string
}

export type FolderChild = Timestamps &
    Protected & {
        name: string
        _parentFolderId?: ObjectId
        tailwindColor?: string
    }

type Timestamps = {
    createdAt: Date
    updatedAt: Date
}

export type CreateInput = {
    parentFolderId?: string
    userId?: string
}

export type UpdateFolderChildInput = {
    name?: string
    parentFolderId?: string
    tailwindColor?: string
}
