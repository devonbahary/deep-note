import { ObjectId } from 'mongoose'

export type FolderChild = Timestamps & {
    name: string
    _parentFolderId?: ObjectId
    tailwindColor?: string
}

type Timestamps = {
    createdAt: Date
    updatedAt: Date
}

export type UpdateFolderChildInput = {
    name?: string
    parentFolderId?: string
    tailwindColor?: string
}
