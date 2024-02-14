import { ErrorElement } from '../../common/components/ErrorElement'
import { LoadingPage } from '../../folder/common/LoadingPage'
import { User } from '../User'
import { useGetUserRootFolders } from '../hooks/useGetUserRootFolders'

export const LoadUser = () => {
    const { data, isPending, isError, error } = useGetUserRootFolders()

    if (isPending) {
        return <LoadingPage />
    }

    if (isError) {
        return <ErrorElement error={error} />
    }

    return <User rootFolders={data} />
}
