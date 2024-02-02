import { Schema } from 'mongoose'
import { mongoose } from '../mongoose'

const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Unnamed note',
        },
        _folderId: Schema.Types.ObjectId,
        content: Object,
    },
    {
        timestamps: true,
    }
)

export const Note = mongoose.model('Note', noteSchema)
