import clsx from 'clsx/lite'
import { FC } from 'react'
import { Folder } from '../types/Folder'
import { Note } from '../types/Note'
import { ListItem, ListItemProps } from './common/ListItem'
import { SVGIcon } from '../types/types'
import LoadingIcon from '../assets/loader-5-line.svg?react'

type FolderListItemProps = Omit<ListItemProps, 'icon'> & {
    item: Folder | Note
    Icon: SVGIcon
    isPending?: boolean
}

export const FolderListItem: FC<FolderListItemProps> = ({
    item,
    Icon,
    isPending,
    ...rest
}) => {
    const iconClassName = clsx(
        item.tailwindColor && `text-${item.tailwindColor}`
    )

    const icon = isPending ? (
        <LoadingIcon className="animate-spin" />
    ) : (
        <Icon className={iconClassName} />
    )

    return <ListItem {...rest} icon={icon} />
}
