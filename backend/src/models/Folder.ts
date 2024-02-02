import { Schema } from 'mongoose'
import { mongoose } from '../mongoose'

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Unnamed folder',
        },
        _folderId: Schema.Types.ObjectId,
    },
    {
        timestamps: true,
    }
)

export const Folder = mongoose.model('Folder', folderSchema)
