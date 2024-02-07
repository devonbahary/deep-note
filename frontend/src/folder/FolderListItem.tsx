import clsx from 'clsx/lite'
import { FC } from 'react'
import { Folder } from '../types/Folder'
import { Note } from '../types/Note'
import { ListItem, ListItemProps } from './common/ListItem'
import { SVGIcon } from '../types/types'

type NewType = {
    item: Folder | Note
    Icon: SVGIcon
}

type FolderListItemProps = Omit<ListItemProps, 'icon'> & NewType

export const FolderListItem: FC<FolderListItemProps> = ({
    item,
    Icon,
    ...rest
}) => {
    const iconClassName = clsx(
        item.tailwindColor && `text-${item.tailwindColor}`
    )

    return <ListItem {...rest} icon={<Icon className={iconClassName} />} />
}
