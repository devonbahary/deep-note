import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useGet } from '../../common/hooks/useApi'
import { Folder } from '../../types/Folder'
import { useUnauthenticatedRootFolderId } from '../../common/hooks/useUnauthenticatedRootFolderId'

const useResetUnauthenticatedRootFolderIfClaimed = (rootFolders?: Folder[]) => {
    const { unauthenticatedRootFolderId, setUnauthenticatedRootFolderId } =
        useUnauthenticatedRootFolderId()

    useEffect(() => {
        if (rootFolders) {
            const isUnauthenticatedRootFolderClaimed = rootFolders.some(
                (f) => f._id === unauthenticatedRootFolderId && f.userId
            )

            if (isUnauthenticatedRootFolderClaimed) {
                setUnauthenticatedRootFolderId(null)
            }
        }
    }, [rootFolders])
}

export const useGetUserRootFolders = () => {
    const { unauthenticatedRootFolderId } = useUnauthenticatedRootFolderId()

    const get = useGet<Folder[]>(
        '/api/user/root-folders' +
            (unauthenticatedRootFolderId
                ? `?unauthenticatedRootFolderId=${unauthenticatedRootFolderId}`
                : '')
    )

    const result = useQuery({
        queryFn: () => get(),
        queryKey: ['user', 'root-folders'],
    })

    useResetUnauthenticatedRootFolderIfClaimed(result.data)

    return result
}
