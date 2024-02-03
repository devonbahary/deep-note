import { ObjectId } from 'mongodb'
import { Folder, FolderType } from '../models/Folder'
import { UpdateQuery } from 'mongoose'
import { Note, NoteType } from '../models/Note'

export const getDescendantFolders = async (
    rootFolderId: string
): Promise<FolderType[]> => {
    const [rootFolder] = await Folder.aggregate([
        {
            $match: {
                _id: rootFolderId,
            },
        },
        {
            $graphLookup: {
                from: Folder.collection.name,
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: '_folderId',
                as: 'heirarchy',
            },
        },
    ])

    return rootFolder.heirarchy
}

export const getFolder = async (id: string): Promise<FolderType | null> => {
    return await Folder.findById(id)
}

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
    const descendants = await getDescendantFolders(id)
    const folderIds = [id, ...descendants.map((f) => f._id)]

    await Folder.deleteMany({
        _id: {
            $in: folderIds,
        },
    })

    await Note.deleteMany({
        _folderId: {
            $in: folderIds,
        },
    })
}
