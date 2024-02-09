import { useParams } from 'react-router-dom'
import { FolderSkeleton } from './FolderSkeleton'
import { ErrorElement } from '../common/ErrorElement'
import { useGetFolder } from './hooks/useFolderQueries'
import { Folder } from './Folder'

export const FolderRoute = () => {
    const { id } = useParams()

    const { isPending, isError, data: folder, error } = useGetFolder(id)

    if (isPending) {
        return <FolderSkeleton />
    }

    if (isError) {
        return <ErrorElement error={error} />
    }

    return <Folder folder={folder} />
}
