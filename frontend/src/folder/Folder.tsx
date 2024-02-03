import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFolder } from './hooks/useFolder'
import { Header } from '../common/Header'
import { FolderItem } from './folder-item/FolderItem'
import { UnorderedList } from './folder-item/UnorderedList'
import { TextInput } from './TextInput'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'
import FolderIcon from '../assets/folder-fill.svg?react'
import NoteIcon from '../assets/file-text-fill.svg?react'

export const Folder = () => {
    const {
        folder,
        addChildFolder,
        addChildNote,
        updateChildFolder,
        updateChildNote,
        deleteChildFolder,
        deleteChildNote,
    } = useFolder()

    const [openedMenuFolderItemId, setOpenedMenuFolderItemId] = useState<
        string | null
    >(null)

    const [isRenaming, setIsRenaming] = useState(false)

    const clearEditing = () => {
        setOpenedMenuFolderItemId(null)
        setIsRenaming(false)
    }

    const onUpdateFolder = async (id: string, name: string) => {
        await updateChildFolder(id, name)
        clearEditing()
    }

    const onUpdateNote = async (id: string, name: string) => {
        await updateChildNote(id, name)
        clearEditing()
    }

    const onDeleteFolder = async (id: string) => {
        await deleteChildFolder(id)
        clearEditing()
    }

    const onDeleteNote = async (id: string) => {
        await deleteChildNote(id)
        clearEditing()
    }

    const navigate = useNavigate()
    const goToFolder = (id: string) => navigate(`/folders/${id}`)
    const goToNote = (id: string) => navigate(`/notes/${id}`)

    return (
        <div className="flex flex-col h-full w-full">
            <Header name={folder.name} folderId={folder._folderId} />
            <div className="grow bg-zinc-900 text-zinc-100">
                <UnorderedList>
                    {folder.folders.map((folder) => {
                        return (
                            <FolderItem
                                key={folder._id}
                                icon={<FolderIcon />}
                                onClick={() => goToFolder(folder._id)}
                                menu={{
                                    isOpen:
                                        !isRenaming &&
                                        openedMenuFolderItemId === folder._id,
                                    onOpen: () =>
                                        setOpenedMenuFolderItemId(folder._id),
                                    onClose: () =>
                                        setOpenedMenuFolderItemId(null),
                                    onDelete: () => onDeleteFolder(folder._id),
                                    onRename: () => setIsRenaming(true),
                                }}
                            >
                                {isRenaming &&
                                openedMenuFolderItemId === folder._id ? (
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
                        return (
                            <FolderItem
                                key={note._id}
                                icon={<NoteIcon />}
                                onClick={() => goToNote(note._id)}
                                menu={{
                                    isOpen:
                                        !isRenaming &&
                                        openedMenuFolderItemId === note._id,
                                    onOpen: () =>
                                        setOpenedMenuFolderItemId(note._id),
                                    onClose: () =>
                                        setOpenedMenuFolderItemId(null),
                                    onDelete: () => onDeleteNote(note._id),
                                    onRename: () => setIsRenaming(true),
                                }}
                            >
                                {isRenaming &&
                                openedMenuFolderItemId === note._id ? (
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
                    <FolderItem
                        icon={<FolderAddIcon />}
                        onClick={addChildFolder}
                    >
                        add folder
                    </FolderItem>
                    <FolderItem icon={<NoteAddIcon />} onClick={addChildNote}>
                        add note
                    </FolderItem>
                </UnorderedList>
            </div>
        </div>
    )
}
