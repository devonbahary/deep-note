type Document = {
    _id: string
}

export type FolderChild = Document &
    Timestamps & {
        name: string
        tailwindColor?: string
    }

export type UpdateFolderChildInput = {
    name?: string
    parentFolderId?: string
    tailwindColor?: string
}

export type Timestamps = {
    createdAt: Date
    updatedAt: Date
}
