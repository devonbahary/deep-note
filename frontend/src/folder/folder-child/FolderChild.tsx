import { FC, MouseEventHandler, ReactNode } from 'react'
import { FolderChildMenu, FolderChildMenuProps } from './FolderChildMenu'
import { FolderChildListItem } from './FolderChildListItem'
import MenuIcon from '../../assets/more-line.svg?react'

type FolderChildProps = {
    children: ReactNode
    icon: ReactNode
    onClick: () => void
    menu?: FolderChildMenuProps & {
        isOpen: boolean
        onOpen: () => void
    }
}

export const FolderChild: FC<FolderChildProps> = ({
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
        <FolderChildListItem
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
                    <FolderChildMenu
                        onClose={menu.onClose}
                        onRename={menu.onRename}
                        onDelete={menu.onDelete}
                    />
                )}
            </div>
        </FolderChildListItem>
    )
}
