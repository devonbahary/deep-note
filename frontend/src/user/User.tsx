import clsx from 'clsx/lite'
import { useAuth0 } from '@auth0/auth0-react'
import UserIcon from '../assets/user-3-line.svg?react'

export const User = () => {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
        useAuth0()

    const userIconClassName = clsx(isLoading && 'animate-ping')

    return (
        <div className="bg-zinc-900 w-full h-full text-zinc-100 flex justify-center items-center">
            <div className="flex flex-col">
                <div className="w-20 self-center">
                    <UserIcon className={userIconClassName} />
                </div>
                {isAuthenticated && user ? (
                    <>
                        <h3 className="text-center">{user.name}</h3>
                        <button
                            className="w-full bg-zinc-800 rounded-md p-2 my-8"
                            onClick={() => logout()}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <h3 className="text-center">User</h3>
                        <button
                            className="w-full bg-zinc-800 rounded-md p-2 my-8"
                            onClick={() => loginWithRedirect()}
                        >
                            Log In
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
