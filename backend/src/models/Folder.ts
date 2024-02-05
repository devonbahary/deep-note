import { Document, ObjectId, Schema } from 'mongoose'
import { mongoose } from '../mongoose'

export type FolderType = Document & {
    name: string
    _parentFolderId: ObjectId
    createdAt: Date
    updatedAt: Date
}

export const DEFAULT_NAME = 'Unnamed folder'

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: DEFAULT_NAME,
        },
        _parentFolderId: Schema.Types.ObjectId,
    },
    {
        timestamps: true,
    }
)

export const Folder = mongoose.model<FolderType>('Folder', folderSchema)
