import { Content } from '@tiptap/react'
import { Note } from '../types/Note'
import { UpdateFolderChildInput } from '../types/types'
import { create, destroy, toJSONOrThrow, update } from './apiUtility'

export const getNote = async (id: string): Promise<Note> => {
    return await toJSONOrThrow(`/api/notes/${id}`)
}

export const createNote = async (parentFolderId: string): Promise<Note> => {
    return await create('/api/notes', parentFolderId)
}

type UpdateNoteInput = UpdateFolderChildInput & {
    content?: Content
}
export const updateNote = async (input: UpdateNoteInput): Promise<Note> => {
    const { id, ...rest } = input
    return await update(`/api/notes/${id}`, rest)
}

export const deleteNote = async (id: string): Promise<void> => {
    await destroy(`/api/notes/${id}`)
}
