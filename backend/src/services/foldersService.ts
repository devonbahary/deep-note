import { ObjectId } from 'mongodb'
import { UpdateQuery } from 'mongoose'
import { Folder, FolderType } from '../models/Folder'
import { Note, NoteType } from '../models/Note'

type FolderWithDescendants = FolderType & {
    descendants: FolderType[]
}

export const getDescendantFolders = async (
    rootFolderId: string
): Promise<FolderType[]> => {
    const [rootFolder] = await Folder.aggregate<FolderWithDescendants>([
        {
            $match: {
                _id: new ObjectId(rootFolderId),
            },
        },
        {
            $graphLookup: {
                from: Folder.collection.name,
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: '_folderId',
                as: 'descendants',
            },
        },
    ])

    if (!rootFolder) {
        throw new Error(`Could not find folder with id ${rootFolderId}`)
    }

    return rootFolder.descendants
}

type DescendantsCount = {
    folders: number
    notes: number
}

export const getFolderDescendantsCount = async (
    rootFolderId: string
): Promise<DescendantsCount> => {
    const descendantFolders = await getDescendantFolders(rootFolderId)
    const descendantNoteCount = await Note.countDocuments({
        _folderId: {
            $in: [rootFolderId, ...descendantFolders.map((f) => f._id)],
        },
    })

    return {
        folders: descendantFolders.length,
        notes: descendantNoteCount,
    }
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
