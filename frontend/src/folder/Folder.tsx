import { useState } from 'react'
import { useFolderApi } from './hooks/useFolderApi'
import { useNavigateFolders } from '../common/hooks/useNavigateFolders'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { FolderChild } from './folder-child/FolderChild'
import { UnorderedList } from './UnorderedList'
import { TextInput } from './TextInput'
import { Note } from '../types/Note'
import { DeleteFolderItemModal } from './delete-modal/DeleteFolderItemModal'
import { DeleteFolderModalContents } from './delete-modal/DeleteFolderModalContents'
import { DeleteNoteModalContents } from './delete-modal/DeleteNoteModalContents'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'
import FolderIcon from '../assets/folder-fill.svg?react'
import NoteIcon from '../assets/file-text-fill.svg?react'

enum EditMode {
    Rename,
    DeleteFolder,
    DeleteNote,
}

export const Folder = () => {
    const {
        folder,
        addChildFolder,
        addChildNote,
        updateChildFolder,
        updateChildNote,
        deleteChildFolder,
        deleteChildNote,
    } = useFolderApi()

    const [openedMenuFolderItemId, setOpenedMenuFolderItemId] = useState<
        string | null
    >(null)
    const [editMode, setEditMode] = useState<EditMode | null>(null)

    const clearEditing = () => {
        setOpenedMenuFolderItemId(null)
        setEditMode(null)
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

    const { goToFolder, goToNote } = useNavigateFolders()

    const isInDeleteMode =
        editMode === EditMode.DeleteNote || editMode === EditMode.DeleteFolder

    return (
        <div className="flex flex-col h-full w-full">
            <Header>
                <HeaderFolderItemContents item={folder} />
            </Header>
            <div className="grow bg-zinc-900 text-zinc-100">
                <UnorderedList>
                    {folder.folders.map((folder) => {
                        return (
                            <FolderChild
                                key={folder._id}
                                icon={<FolderIcon />}
                                onClick={() => goToFolder(folder._id)}
                                menu={{
                                    isOpen:
                                        editMode !== EditMode.Rename &&
                                        openedMenuFolderItemId === folder._id,
                                    onOpen: () =>
                                        setOpenedMenuFolderItemId(folder._id),
                                    onClose: () =>
                                        setOpenedMenuFolderItemId(null),
                                    onDelete: () =>
                                        setEditMode(EditMode.DeleteFolder),
                                    onRename: () =>
                                        setEditMode(EditMode.Rename),
                                }}
                            >
                                {editMode === EditMode.Rename &&
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
                            </FolderChild>
                        )
                    })}
                    {folder.notes.map((note) => {
                        return (
                            <FolderChild
                                key={note._id}
                                icon={<NoteIcon />}
                                onClick={() => goToNote(note._id)}
                                menu={{
                                    isOpen:
                                        editMode !== EditMode.Rename &&
                                        openedMenuFolderItemId === note._id,
                                    onOpen: () =>
                                        setOpenedMenuFolderItemId(note._id),
                                    onClose: () =>
                                        setOpenedMenuFolderItemId(null),
                                    onDelete: () =>
                                        setEditMode(EditMode.DeleteNote),
                                    onRename: () =>
                                        setEditMode(EditMode.Rename),
                                }}
                            >
                                {editMode === EditMode.Rename &&
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
                            </FolderChild>
                        )
                    })}
                    <FolderChild
                        icon={<FolderAddIcon />}
                        onClick={addChildFolder}
                    >
                        add folder
                    </FolderChild>
                    <FolderChild icon={<NoteAddIcon />} onClick={addChildNote}>
                        add note
                    </FolderChild>
                </UnorderedList>
            </div>
            {openedMenuFolderItemId && isInDeleteMode && (
                <DeleteFolderItemModal
                    heading={
                        editMode === EditMode.DeleteFolder
                            ? 'Delete this folder?'
                            : editMode === EditMode.DeleteNote
                              ? 'Delete this note?'
                              : ''
                    }
                    onClose={() => clearEditing()}
                    onDelete={() => {
                        if (editMode === EditMode.DeleteFolder) {
                            onDeleteFolder(openedMenuFolderItemId)
                        } else if (editMode === EditMode.DeleteNote) {
                            onDeleteNote(openedMenuFolderItemId)
                        }
                    }}
                >
                    {editMode === EditMode.DeleteFolder && (
                        <DeleteFolderModalContents
                            folderId={openedMenuFolderItemId}
                        />
                    )}
                    {editMode === EditMode.DeleteNote && (
                        <DeleteNoteModalContents
                            note={
                                folder.notes.find(
                                    (n) => n._id === openedMenuFolderItemId
                                ) as Note
                            }
                        />
                    )}
                </DeleteFolderItemModal>
            )}
        </div>
    )
}
