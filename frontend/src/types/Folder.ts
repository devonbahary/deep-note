import { Note } from './Note'

export type Folder = {
    _id: string
    _folderId?: string
    name: string
    updated: Date
    folders: Folder[]
    notes: Note[]
}

export type FolderDescendantsCount = {
    folders: number
    notes: number
}
