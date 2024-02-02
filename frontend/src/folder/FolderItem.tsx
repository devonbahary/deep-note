import { FC, ReactNode } from 'react'

type FolderItemProps = {
    children: ReactNode
    icon: ReactNode
    onClick: () => void
}

export const FolderItem: FC<FolderItemProps> = ({
    children,
    icon,
    onClick,
}) => {
    return (
        <li
            className="flex gap-2 items-center border-b-2 border-zinc-700 p-2 cursor-pointer hover:bg-zinc-800"
            onClick={onClick}
        >
            <div className="h-8 min-w-8 p-2">{icon}</div>
            {children}
        </li>
    )
}
