import { useState } from 'react'

const KEY = 'unauthenticatedRootFolderId'

const getUnauthenticatedRootFolderId = () => {
    const data = window.localStorage.getItem(KEY)
    return data ? JSON.parse(data) : data
}

const setUnauthenticatedRootFolderId = (id: string | null) => {
    window.localStorage.setItem(KEY, JSON.stringify(id))
}

type UseUnauthenticatedRootFolderIdResponse = {
    unauthenticatedRootFolderId: string | null
    setUnauthenticatedRootFolderId: (id: string | null) => void
}

export const useUnauthenticatedRootFolderId =
    (): UseUnauthenticatedRootFolderIdResponse => {
        const [_, updateState] = useState({})

        return {
            unauthenticatedRootFolderId: getUnauthenticatedRootFolderId(),
            setUnauthenticatedRootFolderId: (id: string | null) => {
                setUnauthenticatedRootFolderId(id)
                updateState({}) // force re-render to update unauthenticatedRootFolderId
            },
        }
    }
