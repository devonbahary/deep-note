import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Folder } from '../../types/Folder'
import { createFolder, deleteFolder, updateFolder } from '../../api/folders'
import { createNote, deleteNote, updateNote } from '../../api/notes'

type UseFolderApiResponse = {
    folder: Folder
    addChildFolder: () => Promise<void>
    addChildNote: () => Promise<void>
    updateChildFolder: (id: string, name: string) => Promise<void>
    updateChildNote: (id: string, name: string) => Promise<void>
    deleteChildFolder: (id: string) => Promise<void>
    deleteChildNote: (id: string) => Promise<void>
}

export const useFolderApi = (): UseFolderApiResponse => {
    const loadedFolder = useLoaderData() as Folder

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

    const updateChildFolder = async (id: string, name: string) => {
        const updatedFolder = await updateFolder(id, name)

        setFolder((prev) => ({
            ...prev,
            folders: prev.folders.map((f) =>
                f._id === id ? updatedFolder : f
            ),
        }))
    }

    const updateChildNote = async (id: string, name: string) => {
        const updatedNote = await updateNote(id, { name })

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
