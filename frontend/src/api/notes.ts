import { Content } from '@tiptap/react'
import { Note } from '../types/Note'

export const getNote = async (id?: string): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}`)
    return response.json()
}

export const createNote = async (folderId?: string): Promise<Note> => {
    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            folderId,
        }),
    })

    return response.json()
}

type UpdateNoteBody = {
    content?: Content
    name?: string
}
export const updateNote = async (
    id: string,
    body: UpdateNoteBody
): Promise<Note> => {
    const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    return response.json()
}
