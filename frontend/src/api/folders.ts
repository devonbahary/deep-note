import { Folder, FolderDescendantsCount } from '../types/Folder'
import { UpdateFolderChildInput } from '../types/types'

export const getFolder = async (id?: string): Promise<Folder> => {
    const response = await fetch(`/api/folders/${id}`)
    return response.json()
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
    const response = await fetch('/api/folders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parentFolderId,
        }),
    })

    return response.json()
}

export const updateFolder = async (
    id: string,
    input: UpdateFolderChildInput
): Promise<Folder> => {
    const response = await fetch(`/api/folders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    })

    return response.json()
}

export const deleteFolder = async (id: string): Promise<void> => {
    await fetch(`/api/folders/${id}`, {
        method: 'DELETE',
    })
}
