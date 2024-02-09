import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Folder, FolderWithFamily } from './../../types/Folder'
import {
    CreateFolderChildInput,
    UpdateFolderChildInput,
} from '../../types/types'
import {
    useCreate,
    useDelete,
    useGet,
    useUpdate,
} from '../../common/hooks/useApi'
import { Note } from '../../types/Note'

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
    const get = useGet<FolderWithFamily>('/api/folders')

    return useQuery({
        queryKey: ['folder', id],
        queryFn: () => {
            if (id) return get(id)
            throw new Error(`Cannot get folder without id`)
        },
        enabled: Boolean(id),
    })
}

export const useAddChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const create = useCreate<Folder, CreateFolderChildInput>('/api/folders')

    return useMutation({
        mutationFn: () => create({ parentFolderId }),
        onSuccess: (createdFolder) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                folders: [...oldData.folders, createdFolder],
            }))
        },
    })
}

export const useAddChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const create = useCreate<Note, CreateFolderChildInput>('/api/notes')

    return useMutation({
        mutationFn: () => create({ parentFolderId }),
        onSuccess: (createdNote) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                notes: [...oldData.notes, createdNote],
            }))
        },
    })
}

export const useUpdateChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Folder, UpdateFolderChildInput>(`/api/folders`)

    return useMutation({
        mutationFn: (input: UpdateFolderChildInput) => update(input.id, input),
        onSuccess: (updatedFolder, { id }) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                folders: oldData.folders.map((f) =>
                    f._id === id ? updatedFolder : f
                ),
            }))
        },
    })
}

export const useUpdateChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Note, UpdateFolderChildInput>(`/api/notes`)

    return useMutation({
        mutationFn: (input: UpdateFolderChildInput) => update(input.id, input),
        onSuccess: (updatedNote, { id }) => {
            updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
                ...oldData,
                notes: oldData.notes.map((n) =>
                    n._id === id ? updatedNote : n
                ),
            }))
        },
    })
}

export const useReparentChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Folder, UpdateFolderChildInput>(`/api/folders`)

    return useMutation({
        mutationFn: (input: ReparentInput) => update(input.id, input),
        onSuccess: (_, { id }) => {
            filterChildFolderFromParentFolder(updateParent, parentFolderId, id)
        },
    })
}

export const useReparentChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Note, UpdateFolderChildInput>(`/api/notes`)

    return useMutation({
        mutationFn: (input: ReparentInput) => update(input.id, input),
        onSuccess: (_, { id }) => {
            filterChildNoteFromParentFolder(updateParent, parentFolderId, id)
        },
    })
}

export const useDeleteChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const deleteFolder = useDelete('/api/folders')

    return useMutation({
        mutationFn: deleteFolder,
        onSuccess: (_, id) => {
            filterChildFolderFromParentFolder(updateParent, parentFolderId, id)
        },
    })
}

export const useDeleteChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const deleteNote = useDelete('/api/notes')

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: (_, id) => {
            filterChildNoteFromParentFolder(updateParent, parentFolderId, id)
        },
    })
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
