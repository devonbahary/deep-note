import { FC } from 'react'
import { UnorderedList } from '../UnorderedList'
import { Overlay } from '../Overlay'
import { FolderChildMenuListItem } from './FolderChildMenuListItem'
import DeleteIcon from '../../assets/delete-bin-line.svg?react'
import TextIcon from '../../assets/text.svg?react'

export type FolderChildMenuProps = {
    onClose: () => void
    onRename: () => void
    onDelete: () => void
}

export const FolderChildMenu: FC<FolderChildMenuProps> = ({
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
                    <FolderChildMenuListItem
                        icon={<TextIcon />}
                        onClick={onRename}
                    >
                        Rename
                    </FolderChildMenuListItem>
                    <FolderChildMenuListItem
                        icon={<DeleteIcon />}
                        onClick={onDelete}
                    >
                        Delete
                    </FolderChildMenuListItem>
                </UnorderedList>
            </div>
        </>
    )
}
