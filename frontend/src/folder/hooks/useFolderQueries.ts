import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FolderWithFamily } from './../../types/Folder'
import {
    createFolder,
    deleteFolder,
    getFolder,
    updateFolder,
} from '../../api/folders'
import { createNote, deleteNote, updateNote } from '../../api/notes'
import { UpdateFolderChildInput } from '../../types/types'

export type ReparentInput = Pick<
    UpdateFolderChildInput,
    'id' | 'parentFolderId'
>

type FolderUpdater = (parentFolder: FolderWithFamily) => FolderWithFamily

type UpdateParent = (folderId: string, updater: FolderUpdater) => void

const useUpdateFolderCache = (): UpdateParent => {
    const queryClient = useQueryClient()

    return (folderId, updater) => {
        queryClient.setQueryData(['folder', folderId], updater)
    }
}

export const useGetFolder = (id?: string) => {
    return useQuery({
        queryKey: ['folder', id],
        queryFn: () => {
            if (id) return getFolder(id)
            throw new Error(`Cannot get folder without id`)
        },
        enabled: Boolean(id),
    })
}

export const useAddChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: addChildFolder } = useMutation({
        mutationFn: () => createFolder(parentFolderId),
        onSuccess: (createdFolder) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                folders: [...oldData.folders, createdFolder],
            }))
        },
    })

    return addChildFolder
}

export const useAddChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: addChildNote } = useMutation({
        mutationFn: () => createNote(parentFolderId),
        onSuccess: (createdNote) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                notes: [...oldData.notes, createdNote],
            }))
        },
    })

    return addChildNote
}

export const useUpdateChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: updateChildFolder } = useMutation({
        mutationFn: updateFolder,
        onSuccess: (updatedFolder, { id }) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                folders: oldData.folders.map((f) =>
                    f._id === id ? updatedFolder : f
                ),
            }))
        },
    })

    return updateChildFolder
}

export const useUpdateChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: updateChildNote } = useMutation({
        mutationFn: updateNote,
        onSuccess: (updatedNote, { id }) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                notes: oldData.notes.map((n) =>
                    n._id === id ? updatedNote : n
                ),
            }))
        },
    })

    return updateChildNote
}

export const useReparentChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: reparentChildFolder } = useMutation({
        mutationFn: (input: ReparentInput) => updateFolder(input),
        onSuccess: (_, { id }) => {
            filterChildFolderFromParentFolder(updateParent, parentFolderId, id)
        },
    })

    return reparentChildFolder
}

export const useReparentChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: reparentChildNote } = useMutation({
        mutationFn: (input: ReparentInput) => updateNote(input),
        onSuccess: (_, { id }) => {
            filterChildNoteFromParentFolder(updateParent, parentFolderId, id)
        },
    })

    return reparentChildNote
}

export const useDeleteChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: deleteChildFolder } = useMutation({
        mutationFn: deleteFolder,
        onSuccess: (_, id) => {
            filterChildFolderFromParentFolder(updateParent, parentFolderId, id)
        },
    })

    return deleteChildFolder
}

export const useDeleteChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const { mutate: deleteChildNote } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (_, id) => {
            filterChildNoteFromParentFolder(updateParent, parentFolderId, id)
        },
    })

    return deleteChildNote
}

const filterChildFolderFromParentFolder = (
    updateParent: UpdateParent,
    parentFolderId: string,
    childFolderId: string
) => {
    updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
        ...oldData,
        folders: oldData.folders.filter((f) => f._id !== childFolderId),
    }))
}

const filterChildNoteFromParentFolder = (
    updateParent: UpdateParent,
    parentFolderId: string,
    childNoteId: string
) => {
    updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
        ...oldData,
        notes: oldData.notes.filter((n) => n._id !== childNoteId),
    }))
}
