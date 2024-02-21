import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

type AccessTokenProviderProps = {
    children: ReactNode
}

type AccessTokenContext = {
    isAuthenticating: boolean
    accessToken: string | null
}

export const AccessTokenContext = createContext<AccessTokenContext>({
    isAuthenticating: true,
    accessToken: null,
})

export const AccessTokenProvider: FC<AccessTokenProviderProps> = ({
    children,
}) => {
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()

    const [accessToken, setAccessToken] = useState<string | null>(null)

    useEffect(() => {
        const getAccessToken = async () => {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: 'deep-note-api',
                },
            })
            setAccessToken(accessToken)
        }

        if (isAuthenticated) getAccessToken()
    }, [isAuthenticated, getAccessTokenSilently])

    const context = {
        accessToken,
        isAuthenticating: isLoading || (isAuthenticated && !accessToken),
    }

    return (
        <AccessTokenContext.Provider value={context}>
            {children}
        </AccessTokenContext.Provider>
    )
}
