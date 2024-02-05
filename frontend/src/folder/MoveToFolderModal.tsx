import { FC } from 'react'
import { Modal } from './Modal'
import { UnorderedList } from './UnorderedList'
import { Folder } from '../types/Folder'
import { ListItem } from './ListItem'
import FolderIcon from '../assets/folder-fill.svg?react'

type MoveToFolderModalProps = {
    childFolderId: string
    parentFolder: Folder
    onClose: () => void
    onMove: (toParentId: string) => void
}

export const MoveToFolderModal: FC<MoveToFolderModalProps> = ({
    childFolderId,
    parentFolder,
    onClose,
    onMove,
}) => {
    const folders = [parentFolder, ...parentFolder.folders].filter(
        (f) => f._id !== childFolderId
    )

    return (
        <Modal heading="Move to another folder" onClose={onClose}>
            <UnorderedList>
                {folders.map((f) => {
                    const isChildFolder = f._id !== parentFolder._id

                    return (
                        <ListItem
                            className={`${isChildFolder ? 'pl-4' : ''} bg-zinc-800 border-zinc-950 hover:bg-zinc-700 last-of-type:border-none`}
                            key={f._id}
                            icon={<FolderIcon />}
                            onClick={() => onMove(f._id)}
                        >
                            {f.name}
                            <span className="text-zinc-400">
                                {isChildFolder ? '' : ' (parent)'}
                            </span>
                        </ListItem>
                    )
                })}
            </UnorderedList>
        </Modal>
    )
}
