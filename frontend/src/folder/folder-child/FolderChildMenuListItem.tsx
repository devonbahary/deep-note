import { FC, ReactNode } from 'react'
import { FolderChildListItem } from './FolderChildListItem'

type FolderChildMenuListItemProps = {
    icon: ReactNode
    children: ReactNode
    onClick: React.MouseEventHandler<HTMLLIElement>
}

export const FolderChildMenuListItem: FC<FolderChildMenuListItemProps> = ({
    children,
    icon,
    onClick,
}) => {
    return (
        <FolderChildListItem
            className="bg-zinc-800 hover:bg-zinc-700 border-b-2 border-zinc-700 last-of-type:border-none"
            onClick={onClick}
        >
            <div className="icon-box">{icon}</div>
            {children}
        </FolderChildListItem>
    )
}
