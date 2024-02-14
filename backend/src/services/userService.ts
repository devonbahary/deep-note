import { Request, Response } from 'express'
import { belongsToUserOrNoOne } from './queryUtility'
import { Folder, FolderType } from '../models/Folder'
import { Note } from '../models/Note'
import {
    getDescendantFolders,
    getFolder,
    updateManyFolders,
} from './foldersService'
import { getUserId, isAuthorized } from '../auth/auth'
import { getNote, updateManyNotes } from './notesService'

export const getUserRootFolders = async (
    req: Request,
    unauthenticatedFolderId?: string
) => {
    const rootFolders = []

    const userId = getUserId(req)

    if (userId) {
        const userRootFolders = await Folder.find({
            userId,
            _parentFolderId: null,
        })

        rootFolders.push(...userRootFolders)
    }

    if (unauthenticatedFolderId) {
        const isAlreadyInUserFolders = rootFolders.some(
            (f) => f._id.toString() === unauthenticatedFolderId
        )

        if (isAlreadyInUserFolders) {
            return rootFolders
        }

        const unauthenticatedFolder = await getFolder(unauthenticatedFolderId)

        if (unauthenticatedFolder && isAuthorized(req, unauthenticatedFolder)) {
            rootFolders.push(unauthenticatedFolder)
        }
    }

    return rootFolders
}

const rejectIfNoAccess = (userId: string, folder: FolderType) => {
    if (folder.userId && folder.userId !== userId) {
        throw new Error(
            `Cannot claim folder for userId ${userId} that already belongs to userId ${folder.userId}`
        )
    }
}

const getAuthorizedDescendants = async (
    userId: string,
    folderId: string
): Promise<{
    noteIds: string[]
    folderIds: string[]
}> => {
    const descendantUnclaimedFolders = await getDescendantFolders(
        folderId,
        belongsToUserOrNoOne(userId)
    )

    const descendantUnclaimedFoldersIds = descendantUnclaimedFolders.map(
        (f) => f._id
    )

    const descendantUnclaimedNotes = await Note.find({
        _parentFolderId: {
            $in: [folderId, ...descendantUnclaimedFoldersIds],
        },
        ...belongsToUserOrNoOne(userId),
    })

    const descendantUnclaimedNoteIds = descendantUnclaimedNotes.map(
        (n) => n._id
    )

    return {
        noteIds: descendantUnclaimedNoteIds,
        folderIds: descendantUnclaimedFoldersIds,
    }
}

export const claimFolderAndDescendants = async (
    userId: string,
    folder: FolderType
) => {
    rejectIfNoAccess(userId, folder)

    const { noteIds, folderIds } = await getAuthorizedDescendants(
        userId,
        folder._id
    )

    await Promise.all([
        updateManyFolders([folder._id, ...folderIds], { userId }),
        updateManyNotes(noteIds, { userId }),
    ])
}

export const unclaimFolderAndDescendants = async (
    userId: string,
    folder: FolderType
) => {
    rejectIfNoAccess(userId, folder)

    const { noteIds, folderIds } = await getAuthorizedDescendants(
        userId,
        folder._id
    )

    await Promise.all([
        updateManyFolders([folder._id, ...folderIds], { userId: null }),
        updateManyNotes(noteIds, { userId: null }),
    ])
}

type UpdateNoteUserIdInput = {
    userId?: string | null
}

export const updateNoteUserId = async (
    req: Request,
    res: Response,
    update: UpdateNoteUserIdInput
) => {
    const { id } = req.params
    const userId = getUserId(req)

    const note = await getNote(id)

    if (!note) {
        res.sendStatus(404)
    } else if (!userId || !isAuthorized(req, note)) {
        res.sendStatus(403)
    } else {
        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
            },
            update,
            {
                new: true,
            }
        )
        res.json(updatedNote)
    }
}
