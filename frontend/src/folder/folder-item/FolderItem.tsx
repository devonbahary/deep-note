import { FC, MouseEventHandler, ReactNode } from 'react'
import { FolderItemMenu, FolderItemMenuProps } from './FolderItemMenu'
import { ListItem } from './ListItem'
import MenuIcon from '../../assets/more-line.svg?react'

type FolderItemProps = {
    children: ReactNode
    icon: ReactNode
    onClick: () => void
    menu?: FolderItemMenuProps & {
        isOpen: boolean
        onOpen: () => void
    }
}

export const FolderItem: FC<FolderItemProps> = ({
    children,
    icon,
    menu,
    onClick,
}) => {
    const onMenuClick: MouseEventHandler<HTMLDivElement> = (e) => {
        if (menu) {
            e.stopPropagation()
            menu.onOpen()
        }
    }

    return (
        <ListItem
            onClick={onClick}
            className="border-b-2 border-zinc-700 hover:bg-zinc-800"
        >
            <div className="h-8 min-w-8 p-2">{icon}</div>
            <div className="flex flex-gap-2 w-full items-center">
                <div className="flex-1">{children}</div>
                {menu && (
                    <div className="icon-box" onClick={onMenuClick}>
                        <MenuIcon />
                    </div>
                )}
                {menu?.isOpen && (
                    <FolderItemMenu
                        onClose={menu.onClose}
                        onRename={menu.onRename}
                        onDelete={menu.onDelete}
                    />
                )}
            </div>
        </ListItem>
    )
}
