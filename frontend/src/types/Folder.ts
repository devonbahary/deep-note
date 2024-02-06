import { Note } from './Note'
import { FolderChild } from './types'

export type Folder = FolderChild & {
    folders: Folder[]
    notes: Note[]
}

export type FolderDescendantsCount = {
    folders: number
    notes: number
}
