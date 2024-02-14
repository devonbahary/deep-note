import { useAuth0 } from '@auth0/auth0-react'
import KeyIcon from '../assets/key-fill.svg?react'
import LockIcon from '../assets/lock-fill.svg?react'
import UserIcon from '../assets/user-3-line.svg?react'

export const UserInfo = () => {
    const { user, isAuthenticated } = useAuth0()

    return (
        <div className="bg-zinc-800 rounded-md">
            <div className="flex gap-2 items-center border-b-2 border-zinc-700 p-2">
                <div className="w-12 h-12">
                    <UserIcon />
                </div>
                <p className="text-center w-full">
                    {isAuthenticated && user ? user.name : 'Anonymous User'}
                </p>
            </div>
            <div className="flex gap-2 items-center p-2 text-zinc-400">
                <div className="w-12 h-12 grid">
                    <div className="icon-box place-self-center">
                        {isAuthenticated && user ? <LockIcon /> : <KeyIcon />}
                    </div>
                </div>
                <p className="w-full text-center">
                    {isAuthenticated && user
                        ? 'Folders and notes you create are private.'
                        : 'Anyone with a link can view your folders and notes.'}
                </p>
            </div>
        </div>
    )
}
