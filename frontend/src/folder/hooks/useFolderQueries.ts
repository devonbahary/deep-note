import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    Folder,
    FolderDescendantsCount,
    FolderWithFamily,
} from './../../types/Folder'
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
    const get = useGet<FolderWithFamily>('/folders')

    return useQuery({
        queryKey: ['folder', id],
        queryFn: () => {
            if (id) return get(id)
            throw new Error(`Cannot get folder without id`)
        },
        enabled: Boolean(id),
    })
}

export const useGetFolderDescendantsCount = (id?: string) => {
    const get = useGet<FolderDescendantsCount>('/folders/descendants-count')

    return useQuery({
        queryKey: ['folder-descendants-count', id],
        queryFn: () => {
            if (id) return get(id)
            throw new Error(`Cannot get folder descendants count without id`)
        },
        enabled: Boolean(id),
    })
}

export const useAddChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const create = useCreate<Folder, CreateFolderChildInput>('/folders')

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

    const create = useCreate<Note, CreateFolderChildInput>('/notes')

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

    const update = useUpdate<Folder, UpdateFolderChildInput>(`/folders`)

    return useMutation({
        mutationFn: (input: UpdateFolderChildInput) => update(input.id, input),
        onSuccess: (updatedFolder) => {
            updateChildFolderInParentFolder(
                updateParent,
                parentFolderId,
                updatedFolder
            )
        },
    })
}

export const useUpdateChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Note, UpdateFolderChildInput>(`/notes`)

    return useMutation({
        mutationFn: (input: UpdateFolderChildInput) => update(input.id, input),
        onSuccess: (updatedNote) => {
            updateChildNoteInParentFolder(
                updateParent,
                parentFolderId,
                updatedNote
            )
        },
    })
}

export const useReparentChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Folder, UpdateFolderChildInput>(`/folders`)

    return useMutation({
        mutationFn: (input: ReparentInput) => update(input.id, input),
        onSuccess: (_, { id }) => {
            filterChildFolderFromParentFolder(updateParent, parentFolderId, id)
        },
    })
}

export const useReparentChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Note, UpdateFolderChildInput>(`/notes`)

    return useMutation({
        mutationFn: (input: ReparentInput) => update(input.id, input),
        onSuccess: (_, { id }) => {
            filterChildNoteFromParentFolder(updateParent, parentFolderId, id)
        },
    })
}

export const useClaimChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Folder, {}>('/user/claim-folder')

    return useMutation({
        mutationFn: (id: string) => update(id, {}),
        onSuccess: (updatedFolder) => {
            updateChildFolderInParentFolder(
                updateParent,
                parentFolderId,
                updatedFolder
            )
        },
    })
}

export const useClaimChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Note, {}>('/user/claim-note')

    return useMutation({
        mutationFn: (id: string) => update(id, {}),
        onSuccess: (updatedNote) => {
            updateChildNoteInParentFolder(
                updateParent,
                parentFolderId,
                updatedNote
            )
        },
    })
}

export const useUnclaimChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Folder, {}>('/user/unclaim-folder')

    return useMutation({
        mutationFn: (id: string) => update(id, {}),
        onSuccess: (updatedFolder) => {
            updateChildFolderInParentFolder(
                updateParent,
                parentFolderId,
                updatedFolder
            )
        },
    })
}

export const useUnclaimChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const update = useUpdate<Note, {}>('/user/unclaim-note')

    return useMutation({
        mutationFn: (id: string) => update(id, {}),
        onSuccess: (updatedNote) => {
            updateChildNoteInParentFolder(
                updateParent,
                parentFolderId,
                updatedNote
            )
        },
    })
}

export const useDeleteChildFolder = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const deleteFolder = useDelete('/folders')

    return useMutation({
        mutationFn: deleteFolder,
        onSuccess: (_, id) => {
            filterChildFolderFromParentFolder(updateParent, parentFolderId, id)
        },
    })
}

export const useDeleteChildNote = (parentFolderId: string) => {
    const updateParent = useUpdateFolderCache()

    const deleteNote = useDelete('/notes')

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

const updateChildFolderInParentFolder = (
    updateParent: UpdateParent,
    parentFolderId: string,
    childFolder: Folder
) => {
    updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
        ...oldData,
        folders: oldData.folders.map((f) =>
            f._id === childFolder._id ? childFolder : f
        ),
    }))
}

const updateChildNoteInParentFolder = (
    updateParent: UpdateParent,
    parentFolderId: string,
    childNote: Note
) => {
    updateParent(parentFolderId, (oldData: FolderWithFamily) => ({
        ...oldData,
        notes: oldData.notes.map((n) =>
            n._id === childNote._id ? childNote : n
        ),
    }))
}
