import { useState } from 'react'
import { Folder } from '../../types/Folder'
import { Note } from '../../types/Note'

export enum EditMode {
    Rename,
    DeleteFolder,
    DeleteNote,
}

type UseFolderUXResponse = {
    editMode: EditMode | null
    editingFolderChildId: string | null
    onMenuOpen: (id: string) => void
    setDeletingFolderMode: (folder: Folder) => void
    setDeletingNoteMode: (note: Note) => void
    setRenamingMode: (id: string) => void
    reset: () => void
}

export const useFolderUX = (): UseFolderUXResponse => {
    const [editMode, setEditMode] = useState<EditMode | null>(null)

    const [editingFolderChildId, setEditingFolderChildId] = useState<
        string | null
    >(null)

    const reset = () => {
        setEditingFolderChildId(null)
        setEditMode(null)
    }

    const onMenuOpen = (id: string) => {
        setEditingFolderChildId(id)
    }

    const setRenamingMode = (id: string) => {
        setEditingFolderChildId(id)
        setEditMode(EditMode.Rename)
    }

    const setDeletingNoteMode = (note: Note) => {
        setEditingFolderChildId(note._id)
        setEditMode(EditMode.DeleteNote)
    }

    const setDeletingFolderMode = (folder: Folder) => {
        setEditingFolderChildId(folder._id)
        setEditMode(EditMode.DeleteFolder)
    }

    return {
        editMode,
        editingFolderChildId,
        onMenuOpen,
        setDeletingFolderMode,
        setDeletingNoteMode,
        setRenamingMode,
        reset,
    }
}
