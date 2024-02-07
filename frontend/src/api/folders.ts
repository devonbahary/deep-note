import { FolderWithFamily, FolderDescendantsCount } from '../types/Folder'
import { UpdateFolderChildInput } from '../types/types'
import { create, destroy, toJSONOrThrow, update } from './apiUtility'

export const getFolder = async (id?: string): Promise<FolderWithFamily> => {
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
): Promise<FolderWithFamily> => {
    return await create('/api/folders', parentFolderId)
}

export const updateFolder = async (
    id: string,
    input: UpdateFolderChildInput
): Promise<FolderWithFamily> => {
    return await update(`/api/folders/${id}`, input)
}

export const deleteFolder = async (id: string): Promise<void> => {
    await destroy(`/api/folders/${id}`)
}
