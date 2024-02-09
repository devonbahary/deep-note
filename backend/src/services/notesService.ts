import { Note, NoteType } from '../models/Note'
import { UpdateQuery } from 'mongoose'
import { CreateInput, UpdateFolderChildInput } from '../types/types'
import { validateParentFolder } from '../validators/parentFolderValidator'

export const getNote = async (id: string): Promise<NoteType | null> => {
    return await Note.findById(id)
}

export const createNote = async (input: CreateInput): Promise<NoteType> => {
    const { parentFolderId, userId } = input

    await validateParentFolder(parentFolderId)

    return await Note.create({
        _parentFolderId: parentFolderId,
        userId,
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
        await validateParentFolder(parentFolderId)

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
