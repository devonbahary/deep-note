import { ObjectId } from 'mongodb'
import { AnyObject, UpdateQuery } from 'mongoose'
import { Folder, FolderType } from '../models/Folder'
import { Note, NoteType } from '../models/Note'
import { CreateInput, Protected, UpdateFolderChildInput } from '../types/types'
import { validateParentFolder } from '../validators/parentFolderValidator'

type FolderWithDescendants = FolderType & {
    descendants: FolderType[]
}

export const getDescendantFolders = async (
    rootFolderId: string,
    restrictSearchWithMatch: AnyObject = {}
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
                restrictSearchWithMatch,
            },
        },
    ])

    if (!rootFolder) {
        throw new Error(`Could not find folder with id ${rootFolderId}`)
    }

    return rootFolder.descendants
}

type DescendantsCount = Protected & {
    folders: number
    notes: number
}

export const getFolderDescendantsCount = async (
    rootFolderId: string
): Promise<DescendantsCount> => {
    const rootFolder = await getFolder(rootFolderId)

    const descendantFolders = await getDescendantFolders(rootFolderId)
    const descendantNoteCount = await Note.countDocuments({
        _parentFolderId: [rootFolderId, ...descendantFolders.map((f) => f._id)],
    })

    return {
        folders: descendantFolders.length,
        notes: descendantNoteCount,
        userId: rootFolder?.userId,
    }
}

export const getFolder = async (id: string): Promise<FolderType | null> => {
    return await Folder.findById(id)
}

type FolderWithFamily = FolderType & {
    parent?: FolderType
    folders: FolderType[]
    notes: NoteType[]
}

export const getFolderWithFamily = async (
    id: string
): Promise<FolderWithFamily> => {
    const folders = await Folder.aggregate<FolderWithFamily>([
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
                pipeline: [
                    {
                        // content should only be shown to authorized users of a note
                        $project: {
                            content: 0,
                        },
                    },
                ],
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
        {
            $lookup: {
                from: 'folders',
                localField: '_parentFolderId',
                foreignField: '_id',
                as: 'parents',
            },
        },
        {
            $unwind: {
                path: '$parents',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $set: {
                parent: '$parents',
                parents: '$$REMOVE',
            },
        },
    ])

    return folders[0]
}

export const createFolder = async (input: CreateInput): Promise<FolderType> => {
    const { parentFolderId, userId } = input

    if (parentFolderId) {
        await validateParentFolder(parentFolderId)
    }

    return await Folder.create({
        name: parentFolderId ? undefined : 'root',
        _parentFolderId: parentFolderId,
        userId,
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
        await validateParentFolder(parentFolderId)

        if (id === parentFolderId) {
            throw new Error(`Folder cannot be a parent to itself`)
        }

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

export const updateManyFolders = async (
    ids: string[],
    update: UpdateQuery<FolderType>
) => {
    return await Folder.updateMany(
        {
            _id: ids,
        },
        update
    )
}

export const deleteFolder = async (id: string): Promise<void> => {
    const descendants = await getDescendantFolders(id)
    const parentFolderIds = [id, ...descendants.map((f) => f._id)]

    await Promise.all([
        Folder.deleteMany({
            _id: parentFolderIds,
        }),
        Note.deleteMany({
            _parentFolderId: parentFolderIds,
        }),
    ])
}
