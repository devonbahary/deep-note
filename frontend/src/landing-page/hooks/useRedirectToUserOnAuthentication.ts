import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigation } from '../../common/hooks/useNavigateFolders'
import { useUnauthenticatedRootFolderId } from '../../common/hooks/useUnauthenticatedRootFolderId'

export const useRedirectToUserOnIdentification = () => {
    const { isAuthenticated } = useAuth0()

    const { goToUser } = useNavigation()

    const { unauthenticatedRootFolderId } = useUnauthenticatedRootFolderId()

    useEffect(() => {
        if (isAuthenticated) goToUser()
        if (!isAuthenticated && unauthenticatedRootFolderId) goToUser()
    }, [isAuthenticated, unauthenticatedRootFolderId])
}
