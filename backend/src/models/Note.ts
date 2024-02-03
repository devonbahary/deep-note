import { Document, ObjectId, Schema } from 'mongoose'
import { mongoose } from '../mongoose'

export type NoteType = Document & {
    name: string
    _folderId?: ObjectId
    content: object
    createdAt: Date
    updatedAt: Date
}

const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Unnamed note',
        },
        _folderId: {
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
