import { Document, ObjectId, Schema } from 'mongoose'
import { mongoose } from '../mongoose'

export type NoteType = Document & {
    name: string
    _parentFolderId?: ObjectId
    content: object
    createdAt: Date
    updatedAt: Date
}

export const DEFAULT_NAME = 'Unnamed note'

const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: DEFAULT_NAME,
        },
        _parentFolderId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: Object,
    },
    {
        timestamps: true,
    }
)

export const Note = mongoose.model<NoteType>('Note', noteSchema)
