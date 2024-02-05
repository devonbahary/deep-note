import { Content } from '@tiptap/react'
import { Timestamps } from './types'

export type Note = Timestamps & {
    _id: string
    _parentFolderId: string
    name: string
    content: Content
}
