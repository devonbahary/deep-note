import { Content } from '@tiptap/react'
import { FolderChild } from './types'

export type Note = FolderChild & {
    _parentFolderId: string
    content?: Content
}
