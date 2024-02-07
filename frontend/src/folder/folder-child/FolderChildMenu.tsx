import { FC, ReactNode } from 'react'
import { UnorderedList } from '../common/UnorderedList'
import { Overlay } from '../common/Overlay'
import { ListItem } from '../common/ListItem'
import DeleteIcon from '../../assets/delete-bin-5-fill.svg?react'
import ColorIcon from '../../assets/palette-fill.svg?react'
import FolderMoveIcon from '../../assets/folder-transfer-fill.svg?react'
import TextIcon from '../../assets/text.svg?react'

export type FolderChildMenuProps = {
    canMove: boolean
    onClose: () => void
    onRename: () => void
    onColor: () => void
    onMove: () => void
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
    onRename,
    onColor,
    onMove,
    onDelete,
}) => {
    const menuItems: MenuItem[] = [
        {
            name: 'Rename',
            icon: <TextIcon />,
            onClick: onRename,
        },
        {
            name: 'Color',
            icon: <ColorIcon />,
            onClick: onColor,
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
