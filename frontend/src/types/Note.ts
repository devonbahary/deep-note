import { Content } from '@tiptap/react'

export type Note = {
    _id: string
    _folderId: string
    name: string
    content: Content
}
