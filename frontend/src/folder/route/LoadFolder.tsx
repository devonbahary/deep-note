import { useParams } from 'react-router-dom'
import { useGetFolder } from '../hooks/useFolderQueries'
import { FolderSkeleton } from './FolderSkeleton'
import { ErrorElement } from '../../common/components/ErrorElement'
import { Folder } from '../Folder'

export const LoadFolder = () => {
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
