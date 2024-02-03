import { ObjectId } from 'mongodb'
import { Folder, FolderType } from '../models/Folder'
import { UpdateQuery } from 'mongoose'
import { NoteType } from '../models/Note'

type FolderAggregationDoc = FolderType & {
    folders: FolderType[]
    notes: NoteType[]
}

export const getFolderWithChildItems = async (
    id: string
): Promise<FolderAggregationDoc[]> => {
    const folders = await Folder.aggregate<FolderAggregationDoc>([
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'notes',
                localField: '_id',
                foreignField: '_folderId',
                as: 'notes',
            },
        },
        {
            $lookup: {
                from: 'folders',
                localField: '_id',
                foreignField: '_folderId',
                as: 'folders',
            },
        },
    ])

    return folders
}

export const createFolder = async (folderId?: string): Promise<FolderType> => {
    return await Folder.create({
        name: folderId ? undefined : 'root',
        _folderId: folderId,
    })
}

export const updateFolder = async (
    id: string,
    name?: string
): Promise<FolderType | null> => {
    const update: UpdateQuery<FolderType> = {}

    if (name) {
        update.name = name.trim()
    }

    return await Folder.findOneAndUpdate(
        {
            _id: id,
        },
        update,
        {
            new: true,
        }
    )
}

export const deleteFolder = async (id: string): Promise<void> => {
    await Folder.deleteOne({
        _id: id,
    })
}
