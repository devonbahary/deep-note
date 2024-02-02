import { Schema } from 'mongoose'
import { mongoose } from '../mongoose'

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

export const Note = mongoose.model('Note', noteSchema)
