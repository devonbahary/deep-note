import { Request } from 'express'
import { FolderDescendantsCount } from './../../../frontend/src/types/Folder'
import { Folder, FolderType } from '../models/Folder'
import { Note, NoteType } from '../models/Note'
import { createFolder, getFolder } from '../services/foldersService'
import { createNote, getNote, updateNote } from '../services/notesService'
import { CreateInput } from '../types/types'

type Siblings = (FolderType | NoteType)[]

const createChildren = async (
    parentFolderId: string,
    userId?: string
): Promise<[FolderType, FolderType, NoteType, NoteType]> => {
    const input: CreateInput = { parentFolderId, userId }

    return await Promise.all([
        createFolder(input),
        createFolder(input),
        createNote(input),
        createNote(input),
    ])
}

// returns a 2D array of folders and notes, where each index into the array represents a generation
export const createFamily = async (userId?: string): Promise<Siblings[]> => {
    const rootFolder = await createFolder({ userId })

    const children = await createChildren(rootFolder._id, userId)

    const [folderA, folderB] = children

    const [grandChildrenA, grandChildrenB] = await Promise.all(
        [folderA, folderB].map((folder) => createChildren(folder._id))
    )

    return [[rootFolder], children, [...grandChildrenA, ...grandChildrenB]]
}

export const flattenFamily = (family: Siblings[]): Siblings => {
    return family.reduce<Siblings>((acc, generation) => {
        acc.push(...generation)
        return acc
    }, [])
}

export const checkUpdatedItem = async (
    item: FolderType | NoteType,
    cb: (item: FolderType | NoteType | null) => void
) => {
    if (item instanceof Folder) {
        const updatedFolder = await getFolder(item._id)
        cb(updatedFolder)
    } else {
        const updatedNote = await getNote(item._id)
        cb(updatedNote)
    }
}

export const getDescendantCount = (
    generations: Siblings[]
): FolderDescendantsCount => {
    const folderCount = generations.reduce<number>((acc, siblings) => {
        return (
            acc +
            siblings.reduce<number>((acc, child) => {
                return child instanceof Folder ? acc + 1 : acc
            }, 0)
        )
    }, 0)

    const noteCount = generations.reduce<number>((acc, siblings) => {
        return (
            acc +
            siblings.reduce<number>((acc, child) => {
                return child instanceof Note ? acc + 1 : acc
            }, 0)
        )
    }, 0)

    return {
        folders: folderCount,
        notes: noteCount,
    }
}

export const createNoteWithContent = async (
    input: CreateInput,
    content: string
): Promise<NoteType> => {
    const note = await createNote(input)

    const updatedNote = await updateNote(note._id, { content })

    if (!updatedNote) {
        throw new Error(`could not find note with id ${note._id}`)
    }

    return updatedNote
}

export const getMockRequest = (userId: string): Request => {
    const mockRequest = {
        auth: {
            payload: {
                sub: userId,
            },
        },
    } as Request

    return mockRequest
}
