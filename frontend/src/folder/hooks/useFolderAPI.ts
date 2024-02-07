import { useEffect, useState } from 'react'
import { Folder } from '../../types/Folder'
import { createFolder, deleteFolder, updateFolder } from '../../api/folders'
import { createNote, deleteNote, updateNote } from '../../api/notes'
import { UpdateFolderChildInput } from '../../types/types'

export type UseFolderAPIResponse = {
    folder: Folder
    addChildFolder: () => Promise<void>
    addChildNote: () => Promise<void>
    updateChildFolder: UpdateChild
    updateChildNote: UpdateChild
    deleteChildFolder: (id: string) => Promise<void>
    deleteChildNote: (id: string) => Promise<void>
}

type UpdateChild = (id: string, input: UpdateFolderChildInput) => void

export const useFolderAPI = (loadedFolder: Folder): UseFolderAPIResponse => {
    const [folder, setFolder] = useState<Folder>(loadedFolder)

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

    const updateChildFolder: UpdateChild = async (id, input) => {
        const updatedFolder = await updateFolder(id, input)

        setFolder((prev) => ({
            ...prev,
            folders: prev.folders.map((f) =>
                f._id === id ? updatedFolder : f
            ),
        }))
    }

    const updateChildNote: UpdateChild = async (id, input) => {
        const updatedNote = await updateNote(id, input)

        setFolder((prev) => ({
            ...prev,
            notes: prev.notes.map((n) => (n._id === id ? updatedNote : n)),
        }))
    }

    const deleteChildFolder = async (id: string) => {
        await deleteFolder(id)

        setFolder((prev) => ({
            ...prev,
            folders: prev.folders.filter((f) => f._id !== id),
        }))
    }

    const deleteChildNote = async (id: string) => {
        await deleteNote(id)

        setFolder((prev) => ({
            ...prev,
            notes: prev.notes.filter((n) => n._id !== id),
        }))
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
