import {
    FolderWithFamily,
    FolderDescendantsCount,
    Folder,
} from '../types/Folder'
import { UpdateFolderChildInput } from '../types/types'
import { create, destroy, toJSONOrThrow, update } from './apiUtility'

export const getFolder = async (id: string): Promise<FolderWithFamily> => {
    return await toJSONOrThrow(`/api/folders/${id}`)
}

export const getFolderDescendantsCount = async (
    id: string
): Promise<FolderDescendantsCount> => {
    const response = await fetch(`/api/folders/descendants-count/${id}`)
    return response.json()
}

export const createFolder = async (
    parentFolderId?: string
): Promise<Folder> => {
    return await create('/api/folders', parentFolderId)
}

export const updateFolder = async (
    input: UpdateFolderChildInput
): Promise<FolderWithFamily> => {
    const { id, ...rest } = input
    return await update(`/api/folders/${id}`, rest)
}

export const deleteFolder = async (id: string): Promise<void> => {
    await destroy(`/api/folders/${id}`)
}
