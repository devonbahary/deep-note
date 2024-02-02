import { useLoaderData, useNavigate } from 'react-router-dom'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'
import FolderIcon from '../assets/folder-fill.svg?react'
import NoteIcon from '../assets/file-text-fill.svg?react'
import { Folder as FolderType } from '../types/Folder'
import { Header } from '../common/Header'
import { FolderItem } from './FolderItem'
import { createFolder } from '../api/folders'
import { useEffect, useState } from 'react'
import { createNote } from '../api/notes'

export const Folder = () => {
    const loadedFolder = useLoaderData() as FolderType

    // TODO: can use actions useSubmit() to automatically refetch loadedFolder?
    const [folder, setFolder] = useState<FolderType>(loadedFolder)

    const navigate = useNavigate()

    const onAddFolder = async () => {
        const newFolder = await createFolder(folder._id)
        setFolder((prev) => ({
            ...prev,
            folders: [...prev.folders, newFolder],
        }))
    }

    const onAddNote = async () => {
        const newNote = await createNote(folder._id)
        setFolder((prev) => ({
            ...prev,
            notes: [...prev.notes, newNote],
        }))
    }

    const goToFolder = (id: string) => navigate(`/folders/${id}`)

    const goToNote = (id: string) => navigate(`/notes/${id}`)

    useEffect(() => {
        setFolder(loadedFolder)
    }, [loadedFolder])

    return (
        <div className="flex flex-col h-full w-full">
            <Header name={folder.name} folderId={folder._folderId} />
            <div className="grow bg-zinc-900 text-zinc-100">
                <ul className="list-none p-0">
                    {folder.folders.map((folder) => {
                        return (
                            <FolderItem
                                key={folder._id}
                                icon={<FolderIcon />}
                                onClick={() => goToFolder(folder._id)}
                            >
                                {folder.name}
                            </FolderItem>
                        )
                    })}
                    {folder.notes.map((note) => {
                        return (
                            <FolderItem
                                key={note._id}
                                icon={<NoteIcon />}
                                onClick={() => goToNote(note._id)}
                            >
                                {note.name}
                            </FolderItem>
                        )
                    })}
                    <FolderItem icon={<FolderAddIcon />} onClick={onAddFolder}>
                        add folder
                    </FolderItem>
                    <FolderItem icon={<NoteAddIcon />} onClick={onAddNote}>
                        add note
                    </FolderItem>
                </ul>
            </div>
        </div>
    )
}
