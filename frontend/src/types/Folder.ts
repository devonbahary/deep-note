import { Note } from './Note'

export type Folder = {
    _id: string
    _folderId?: string
    name: string
    updated: Date
    folders: Folder[]
    notes: Note[]
}
