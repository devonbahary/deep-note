import { Note, NoteType } from '../models/Note'
import { UpdateQuery } from 'mongoose'

export const getNote = async (id: string): Promise<NoteType | null> => {
    return await Note.findById(id)
}

export const createNote = async (folderId: string): Promise<NoteType> => {
    return await Note.create({
        _folderId: folderId,
    })
}

type UpdateNoteInput = {
    content?: string
    name?: string
}

export const updateNote = async (
    id: string,
    input: UpdateNoteInput
): Promise<NoteType | null> => {
    const { content, name } = input

    const update: UpdateQuery<UpdateNoteInput> = {}

    if (content) {
        update.content = content
    }

    if (name) {
        update.name = name.trim()
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
