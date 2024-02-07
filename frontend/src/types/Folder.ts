import { Note } from './Note'
import { FolderChild } from './types'

export type FolderWithFamily = FolderChild & {
    parent?: Folder
    folders: Folder[]
    notes: Note[]
}

export type Folder = FolderChild

export type FolderDescendantsCount = {
    folders: number
    notes: number
}
