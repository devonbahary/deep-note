import { Document, ObjectId, Schema } from 'mongoose'
import { mongoose } from '../mongoose'

export type FolderType = Document & {
    name: string
    _folderId: ObjectId
    createdAt: Date
    updatedAt: Date
}

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

export const Folder = mongoose.model<FolderType>('Folder', folderSchema)
