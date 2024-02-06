import { Note, NoteType } from '../models/Note'
import { UpdateQuery } from 'mongoose'
import { UpdateFolderChildInput } from '../types/types'

export const getNote = async (id: string): Promise<NoteType | null> => {
    return await Note.findById(id)
}

export const createNote = async (parentFolderId: string): Promise<NoteType> => {
    return await Note.create({
        _parentFolderId: parentFolderId,
    })
}

type UpdateNoteInput = UpdateFolderChildInput & {
    content?: string
}

export const updateNote = async (
    id: string,
    input: UpdateNoteInput
): Promise<NoteType | null> => {
    const { content, name, parentFolderId, tailwindColor } = input

    const update: UpdateQuery<NoteType> = {}

    if (content) {
        update.content = content
    }

    if (name) {
        update.name = name.trim()
    }

    if (parentFolderId) {
        update._parentFolderId = parentFolderId
    }

    if (tailwindColor) {
        update.tailwindColor = tailwindColor
    }

    return await Note.findOneAndUpdate(
        {
            _id: id,
        },
        update,
        {
            new: true,
        }
    )
}

export const deleteNote = async (id: string): Promise<void> => {
    await Note.deleteOne({
        _id: id,
    })
}
