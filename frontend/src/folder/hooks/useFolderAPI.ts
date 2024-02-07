import { useEffect, useState } from 'react'
import { FolderWithFamily } from '../../types/Folder'
import { createFolder, deleteFolder, updateFolder } from '../../api/folders'
import { createNote, deleteNote, updateNote } from '../../api/notes'
import { UpdateFolderChildInput } from '../../types/types'

export type UseFolderAPIResponse = {
    folder: FolderWithFamily
    addChildFolder: () => Promise<void>
    addChildNote: () => Promise<void>
    updateChildFolder: UpdateChild
    updateChildNote: UpdateChild
    deleteChildFolder: (id: string) => Promise<void>
    deleteChildNote: (id: string) => Promise<void>
}

export type UpdateChild = (
    id: string,
    input: UpdateFolderChildInput,
    removeFromFolder?: boolean
) => void

export const useFolderAPI = (
    loadedFolder: FolderWithFamily
): UseFolderAPIResponse => {
    const [folder, setFolder] = useState<FolderWithFamily>(loadedFolder)

    const addChildFolder = async () => {
        const newFolder = await createFolder(folder._id)

        setFolder((prev) => ({
            ...prev,
            folders: [...prev.folders, newFolder],
        }))
    }

    const addChildNote = async () => {
        const newNote = await createNote(folder._id)

        setFolder((prev) => ({
            ...prev,
            notes: [...prev.notes, newNote],
        }))
    }

    const removeChildFolder = (id: string) => {
        setFolder((prev) => ({
            ...prev,
            folders: prev.folders.filter((f) => f._id !== id),
        }))
    }

    const removeChildNote = (id: string) => {
        setFolder((prev) => ({
            ...prev,
            notes: prev.notes.filter((n) => n._id !== id),
        }))
    }

    const updateChildFolder: UpdateChild = async (
        id,
        input,
        removeFromFolder = false
    ) => {
        const updatedFolder = await updateFolder(id, input)

        if (removeFromFolder) {
            removeChildFolder(id)
        } else {
            setFolder((prev) => ({
                ...prev,
                folders: prev.folders.map((f) =>
                    f._id === id ? updatedFolder : f
                ),
            }))
        }
    }

    const updateChildNote: UpdateChild = async (
        id,
        input,
        removeFromFolder = false
    ) => {
        const updatedNote = await updateNote(id, input)

        if (removeFromFolder) {
            removeChildNote(id)
        } else {
            setFolder((prev) => ({
                ...prev,
                notes: prev.notes.map((n) => (n._id === id ? updatedNote : n)),
            }))
        }
    }

    const deleteChildFolder = async (id: string) => {
        await deleteFolder(id)
        removeChildFolder(id)
    }

    const deleteChildNote = async (id: string) => {
        await deleteNote(id)
        removeChildNote(id)
    }

    useEffect(() => {
        setFolder(loadedFolder)
    }, [loadedFolder])

    return {
        folder,
        addChildFolder,
        addChildNote,
        updateChildFolder,
        updateChildNote,
        deleteChildFolder,
        deleteChildNote,
    }
}
