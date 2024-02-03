import { FC } from 'react'
import { UnorderedList } from './UnorderedList'
import { Overlay } from './Overlay'
import { FolderItemMenuListItem } from './FolderItemMenuListItem'
import DeleteIcon from '../../assets/delete-bin-line.svg?react'
import TextIcon from '../../assets/text.svg?react'

export type FolderItemMenuProps = {
    onClose: () => void
    onRename: () => void
    onDelete: () => void
}

export const FolderItemMenu: FC<FolderItemMenuProps> = ({
    onClose,
    onDelete,
    onRename,
}) => {
    return (
        <>
            <Overlay onClick={() => onClose()} />
            <div
                className="fixed right-0 border-2 border-zinc-700 rounded-md"
                onClick={(e) => e.stopPropagation()}
            >
                <UnorderedList>
                    <FolderItemMenuListItem
                        icon={<TextIcon />}
                        onClick={onRename}
                    >
                        Rename
                    </FolderItemMenuListItem>
                    <FolderItemMenuListItem
                        icon={<DeleteIcon />}
                        onClick={onDelete}
                    >
                        Delete
                    </FolderItemMenuListItem>
                </UnorderedList>
            </div>
        </>
    )
}
