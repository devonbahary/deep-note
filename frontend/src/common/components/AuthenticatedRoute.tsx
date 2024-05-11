import { FC, ReactNode, useContext } from 'react'
import { LoadingPage } from '../../folder/common/LoadingPage'
import { AccessTokenContext } from './AccessTokenProvider'
import { ErrorElement } from './ErrorElement'

type AuthenticatedRouteProps = {
    children: ReactNode
}

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
    children,
}) => {
    const { isAuthenticating, error } = useContext(AccessTokenContext)

    if (isAuthenticating) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorElement error={error} />
    }

    return children;
}
