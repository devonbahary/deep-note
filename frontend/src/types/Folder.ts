import { Note } from './Note'
import { Timestamps } from './types'

export type Folder = Timestamps & {
    _id: string
    _parentFolderId?: string
    name: string
    folders: Folder[]
    notes: Note[]
}

export type FolderDescendantsCount = {
    folders: number
    notes: number
}
