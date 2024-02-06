import { Document, Schema } from 'mongoose'
import { mongoose } from '../mongoose'
import { FolderChild } from '../types/types'

export type NoteType = Document &
    FolderChild & {
        content: object
    }

export const DEFAULT_NAME = 'Unnamed note'

const noteSchema = new mongoose.Schema<NoteType>(
    {
        name: {
            type: String,
            default: DEFAULT_NAME,
        },
        _parentFolderId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        tailwindColor: {
            type: String,
        },
        content: Object,
    },
    {
        timestamps: true,
    }
)

export const Note = mongoose.model<NoteType>('Note', noteSchema)
