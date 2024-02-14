import clsx from 'clsx/lite'
import { useAuth0 } from '@auth0/auth0-react'

export const AuthenticationAction = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()

    const onClick = () => {
        if (isAuthenticated) {
            logout()
        } else {
            loginWithRedirect({
                appState: {
                    hello: 'world',
                },
            })
        }
    }

    const buttonClassName = clsx(
        'w-full bg-zinc-800 rounded-md p-2 transition ease-out duration-200',
        isLoading
            ? 'animate-ping opacity-50 cursor-default'
            : 'hover:bg-zinc-700'
    )

    return (
        <button className={buttonClassName} onClick={onClick}>
            {isAuthenticated ? 'Log Out' : 'Log In'}
        </button>
    )
}
