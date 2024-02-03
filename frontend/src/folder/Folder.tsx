import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Folder as FolderType } from '../types/Folder'
import { Header } from '../common/Header'
import { FolderItem } from './folder-item/FolderItem'
import { UnorderedList } from './folder-item/UnorderedList'
import { TextInput } from './TextInput'
import { createFolder, deleteFolder, updateFolder } from '../api/folders'
import { createNote, deleteNote, updateNote } from '../api/notes'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'
import FolderIcon from '../assets/folder-fill.svg?react'
import NoteIcon from '../assets/file-text-fill.svg?react'

export const Folder = () => {
    const loadedFolder = useLoaderData() as FolderType

    // TODO: can use actions useSubmit() to automatically refetch loadedFolder?
    const [folder, setFolder] = useState<FolderType>(loadedFolder)

    const [openedMenuFolderItemId, setOpenedMenuFolderItemId] = useState<
        string | null
    >(null)

    const [isRenaming, setIsRenaming] = useState(false)

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

    const onUpdateFolder = async (id: string, name: string) => {
        const updatedFolder = await updateFolder(id, name)

        setOpenedMenuFolderItemId(null)
        setIsRenaming(false)

        setFolder((prev) => ({
            ...prev,
            folders: prev.folders.map((f) =>
                f._id === id ? updatedFolder : f
            ),
        }))
    }

    const onUpdateNote = async (id: string, name: string) => {
        const updatedNote = await updateNote(id, { name })

        setOpenedMenuFolderItemId(null)
        setIsRenaming(false)

        setFolder((prev) => ({
            ...prev,
            notes: prev.notes.map((n) => (n._id === id ? updatedNote : n)),
        }))
    }

    const onDeleteFolder = async (id: string) => {
        await deleteFolder(id)

        setOpenedMenuFolderItemId(null)

        setFolder((prev) => ({
            ...prev,
            folders: prev.folders.filter((f) => f._id !== id),
        }))
    }

    const onDeleteNote = async (id: string) => {
        await deleteNote(id)

        setOpenedMenuFolderItemId(null)

        setFolder((prev) => ({
            ...prev,
            notes: prev.notes.filter((n) => n._id !== id),
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
                <UnorderedList>
                    {folder.folders.map((folder) => {
                        const menuProps = {
                            isOpen:
                                !isRenaming &&
                                openedMenuFolderItemId === folder._id,
                            onOpen: () => setOpenedMenuFolderItemId(folder._id),
                            onClose: () => setOpenedMenuFolderItemId(null),
                            onDelete: () => onDeleteFolder(folder._id),
                            onRename: () => setIsRenaming(true),
                        }

                        const isRenamingFolder =
                            isRenaming && openedMenuFolderItemId === folder._id

                        return (
                            <FolderItem
                                key={folder._id}
                                icon={<FolderIcon />}
                                onClick={() => goToFolder(folder._id)}
                                menu={menuProps}
                            >
                                {isRenamingFolder ? (
                                    <TextInput
                                        defaultValue={folder.name}
                                        onSubmit={async (text) => {
                                            await onUpdateFolder(
                                                folder._id,
                                                text
                                            )
                                        }}
                                        placeholder="folder name"
                                    />
                                ) : (
                                    folder.name
                                )}
                            </FolderItem>
                        )
                    })}
                    {folder.notes.map((note) => {
                        const menuProps = {
                            isOpen:
                                !isRenaming &&
                                openedMenuFolderItemId === note._id,
                            onOpen: () => setOpenedMenuFolderItemId(note._id),
                            onClose: () => setOpenedMenuFolderItemId(null),
                            onDelete: () => onDeleteNote(note._id),
                            onRename: () => setIsRenaming(true),
                        }

                        const isRenamingNote =
                            isRenaming && openedMenuFolderItemId === note._id

                        return (
                            <FolderItem
                                key={note._id}
                                icon={<NoteIcon />}
                                onClick={() => goToNote(note._id)}
                                menu={menuProps}
                            >
                                {isRenamingNote ? (
                                    <TextInput
                                        defaultValue={note.name}
                                        onSubmit={async (text) => {
                                            await onUpdateNote(note._id, text)
                                        }}
                                        placeholder="note name"
                                    />
                                ) : (
                                    note.name
                                )}
                            </FolderItem>
                        )
                    })}
                    <FolderItem icon={<FolderAddIcon />} onClick={onAddFolder}>
                        add folder
                    </FolderItem>
                    <FolderItem icon={<NoteAddIcon />} onClick={onAddNote}>
                        add note
                    </FolderItem>
                </UnorderedList>
            </div>
        </div>
    )
}
