import { Folder } from '../types/Folder'

export const getFolder = async (id?: string): Promise<Folder> => {
    const response = await fetch(`/api/folders/${id}`)
    return response.json()
}

export const createFolder = async (folderId?: string): Promise<Folder> => {
    const response = await fetch('/api/folders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            folderId,
        }),
    })

    return response.json()
}
