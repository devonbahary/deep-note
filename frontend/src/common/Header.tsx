import { FC } from 'react'
import ArrowLeftIcon from '../assets/arrow-left-line.svg?react'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
    name: string
    folderId?: string
}

export const Header: FC<HeaderProps> = ({ name, folderId }) => {
    const navigate = useNavigate()

    const goToFolder = () => navigate(`/folders/${folderId}`)

    return (
        <div className="bg-zinc-950 text-zinc-100 h-12 items-center flex px-2flex-none shadow-lg gap-2">
            <button
                className={`h-8 min-w-8 p-2 ${folderId ? 'visible' : 'invisible'}`}
                onClick={goToFolder}
            >
                <ArrowLeftIcon />
            </button>
            <div>{name}</div>
        </div>
    )
}
