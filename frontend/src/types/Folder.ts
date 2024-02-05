import { Note } from './Note'

export type Folder = {
    _id: string
    _parentFolderId?: string
    name: string
    // TODO: correct timestamps
    updated: Date
    folders: Folder[]
    notes: Note[]
}

export type FolderDescendantsCount = {
    folders: number
    notes: number
}
