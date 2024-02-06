import { Document, Schema } from 'mongoose'
import { mongoose } from '../mongoose'
import { FolderChild } from '../types/types'

export type FolderType = Document & FolderChild

export const DEFAULT_NAME = 'Unnamed folder'

const folderSchema = new mongoose.Schema<FolderType>(
    {
        name: {
            type: String,
            default: DEFAULT_NAME,
        },
        _parentFolderId: Schema.Types.ObjectId,
        tailwindColor: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const Folder = mongoose.model<FolderType>('Folder', folderSchema)
