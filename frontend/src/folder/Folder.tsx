import { useFolderAPI } from './hooks/useFolderAPI'
import { EditMode, useFolderUX } from './hooks/useFolderUX'
import { useNavigateFolders } from '../common/hooks/useNavigateFolders'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { FolderChild } from './folder-child/FolderChild'
import { UnorderedList } from './UnorderedList'
import { TextInput } from './TextInput'
import { DeleteFolderItemModal } from './delete-modal/DeleteFolderItemModal'
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
    } = useFolderAPI()

    const {
        editMode,
        editingFolderChildId,
        onMenuOpen,
        setDeletingFolderMode,
        setDeletingNoteMode,
        setRenamingMode,
        reset,
    } = useFolderUX()

    const onUpdateFolder = async (id: string, name: string) => {
        await updateChildFolder(id, name)
        reset()
    }

    const onUpdateNote = async (id: string, name: string) => {
        await updateChildNote(id, name)
        reset()
    }

    const onDeleteFolder = async (id: string) => {
        await deleteChildFolder(id)
        reset()
    }

    const onDeleteNote = async (id: string) => {
        await deleteChildNote(id)
        reset()
    }

    const onDelete = () => {
        if (!editingFolderChildId) return

        if (editMode === EditMode.DeleteFolder) {
            onDeleteFolder(editingFolderChildId)
        }

        if (editMode === EditMode.DeleteNote) {
            onDeleteNote(editingFolderChildId)
        }
    }

    const { goToFolder, goToNote } = useNavigateFolders()

    const isInDeleteMode =
        editMode === EditMode.DeleteNote || editMode === EditMode.DeleteFolder

    const isMenuOpen = Boolean(editingFolderChildId && !editMode)

    return (
        <div className="flex flex-col h-full w-full">
            <Header>
                <HeaderFolderItemContents item={folder} />
            </Header>
            <UnorderedList className="grow bg-zinc-900 text-zinc-100">
                {folder.folders.map((folder) => {
                    const isEditingThis = editingFolderChildId === folder._id

                    return (
                        <FolderChild
                            key={folder._id}
                            icon={<FolderIcon />}
                            onClick={() => goToFolder(folder._id)}
                            menu={{
                                isOpen: isMenuOpen && isEditingThis,
                                onOpen: () => onMenuOpen(folder._id),
                                onClose: () => reset(),
                                onDelete: () => setDeletingFolderMode(folder),
                                onRename: () => setRenamingMode(folder._id),
                            }}
                        >
                            {editMode === EditMode.Rename && isEditingThis ? (
                                <TextInput
                                    defaultValue={folder.name}
                                    onSubmit={async (text) => {
                                        await onUpdateFolder(folder._id, text)
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
                    const isEditingThis = editingFolderChildId === note._id

                    return (
                        <FolderChild
                            key={note._id}
                            icon={<NoteIcon />}
                            onClick={() => goToNote(note._id)}
                            menu={{
                                isOpen: isMenuOpen && isEditingThis,
                                onOpen: () => onMenuOpen(note._id),
                                onClose: () => reset(),
                                onDelete: () => setDeletingNoteMode(note),
                                onRename: () => setRenamingMode(note._id),
                            }}
                        >
                            {editMode === EditMode.Rename && isEditingThis ? (
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
                <FolderChild icon={<FolderAddIcon />} onClick={addChildFolder}>
                    add folder
                </FolderChild>
                <FolderChild icon={<NoteAddIcon />} onClick={addChildNote}>
                    add note
                </FolderChild>
            </UnorderedList>
            {editingFolderChildId && isInDeleteMode && (
                <DeleteFolderItemModal
                    editMode={editMode}
                    editingFolderChildId={editingFolderChildId}
                    folder={folder}
                    onClose={reset}
                    onDelete={onDelete}
                ></DeleteFolderItemModal>
            )}
        </div>
    )
}
