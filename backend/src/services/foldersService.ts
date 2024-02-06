import { ObjectId } from 'mongodb'
import { UpdateQuery } from 'mongoose'
import { Folder, FolderType } from '../models/Folder'
import { Note, NoteType } from '../models/Note'
import { UpdateFolderChildInput } from '../types/types'

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
                connectToField: '_parentFolderId',
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
        _parentFolderId: {
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
                foreignField: '_parentFolderId',
                as: 'notes',
            },
        },
        {
            $lookup: {
                from: 'folders',
                localField: '_id',
                foreignField: '_parentFolderId',
                as: 'folders',
            },
        },
    ])

    return folders
}

export const createFolder = async (
    parentFolderId?: string
): Promise<FolderType> => {
    return await Folder.create({
        name: parentFolderId ? undefined : 'root',
        _parentFolderId: parentFolderId,
    })
}

export const updateFolder = async (
    id: string,
    input: UpdateFolderChildInput
): Promise<FolderType | null> => {
    const { name, parentFolderId, tailwindColor } = input

    const update: UpdateQuery<FolderType> = {}

    if (name) {
        update.name = name.trim()
    }

    if (parentFolderId) {
        update._parentFolderId = parentFolderId
    }

    if (tailwindColor) {
        update.tailwindColor = tailwindColor
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
    const parentFolderIds = [id, ...descendants.map((f) => f._id)]

    await Folder.deleteMany({
        _id: {
            $in: parentFolderIds,
        },
    })

    await Note.deleteMany({
        _parentFolderId: {
            $in: parentFolderIds,
        },
    })
}
