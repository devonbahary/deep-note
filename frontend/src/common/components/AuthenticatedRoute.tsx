import { FC, ReactNode, useContext } from 'react'
import { LoadingPage } from '../../folder/common/LoadingPage'
import { AccessTokenContext } from './AccessTokenProvider'

type AuthenticatedRouteProps = {
    children: ReactNode
}

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
    children,
}) => {
    const { isAuthenticating } = useContext(AccessTokenContext)
    return isAuthenticating ? <LoadingPage /> : children
}
