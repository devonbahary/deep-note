import { FC, ReactNode } from 'react'
import { UnorderedList } from '../UnorderedList'
import { Overlay } from '../Overlay'
import { ListItem } from '../ListItem'
import DeleteIcon from '../../assets/delete-bin-line.svg?react'
import FolderMoveIcon from '../../assets/folder-transfer-fill.svg?react'
import TextIcon from '../../assets/text.svg?react'

export type FolderChildMenuProps = {
    canMove: boolean
    onClose: () => void
    onMove: () => void
    onRename: () => void
    onDelete: () => void
}

type MenuItem = {
    icon: ReactNode
    name: string
    onClick: () => void
}

export const FolderChildMenu: FC<FolderChildMenuProps> = ({
    canMove,
    onClose,
    onDelete,
    onMove,
    onRename,
}) => {
    const menuItems: MenuItem[] = [
        {
            name: 'Rename',
            icon: <TextIcon />,
            onClick: onRename,
        },
    ]

    if (canMove) {
        menuItems.push({
            name: 'Move to...',
            icon: <FolderMoveIcon />,
            onClick: onMove,
        })
    }

    menuItems.push({
        name: 'Delete',
        icon: <DeleteIcon />,
        onClick: onDelete,
    })

    return (
        <>
            <Overlay onClick={() => onClose()} />
            <div
                className="fixed right-0 border-2 border-zinc-950 rounded-md"
                onClick={(e) => e.stopPropagation()}
            >
                <UnorderedList>
                    {menuItems.map(({ name, ...rest }) => (
                        <ListItem
                            key={name}
                            className="bg-zinc-800 hover:bg-zinc-700 border-zinc-950 last-of-type:border-none"
                            {...rest}
                        >
                            {name}
                        </ListItem>
                    ))}
                </UnorderedList>
            </div>
        </>
    )
}
