import { Content } from '@tiptap/react'

export type Note = {
    _id: string
    _parentFolderId: string
    name: string
    content: Content
}
