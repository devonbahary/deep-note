import { FC, ReactNode } from 'react'
import { ListItem } from './ListItem'

type FolderItemMenuListItemProps = {
    icon: ReactNode
    children: ReactNode
    onClick: React.MouseEventHandler<HTMLLIElement>
}

export const FolderItemMenuListItem: FC<FolderItemMenuListItemProps> = ({
    children,
    icon,
    onClick,
}) => {
    return (
        <ListItem
            className="bg-zinc-800 hover:bg-zinc-700 border-b-2 border-zinc-700 last-of-type:border-none"
            onClick={onClick}
        >
            <div className="icon-box">{icon}</div>
            {children}
        </ListItem>
    )
}
