import { FC } from 'react'
import { Modal } from '../modal/Modal'
import { UnorderedList } from '../common/UnorderedList'
import { Folder, FolderWithFamily } from '../../types/Folder'
import { TruncatedTextDiv } from '../../common/TruncatedTextDiv'
import { FolderListItem } from '../FolderListItem'
import FolderIcon from '../../assets/folder-fill.svg?react'

type MoveToFolderModalProps = {
    childFolderId: string
    parentFolder: FolderWithFamily
    onClose: () => void
    onMove: (toParentId: string) => void
}

const getPaddingLeft = (isGrandParent: boolean, isParent: boolean) => {
    if (isGrandParent) {
        return 'pl-0'
    }

    if (isParent) {
        return 'pl-4'
    }

    return 'pl-8' // isChild
}

export const MoveToFolderModal: FC<MoveToFolderModalProps> = ({
    childFolderId,
    parentFolder,
    onClose,
    onMove,
}) => {
    const folders = [
        parentFolder.parent,
        parentFolder,
        ...parentFolder.folders,
    ].filter((f): f is Folder => Boolean(f))

    return (
        <Modal heading="Move to another folder" onClose={onClose}>
            <UnorderedList>
                {folders.map((f) => {
                    const isGrandParent = f._id === parentFolder.parent?._id
                    const isParent = f._id === parentFolder._id

                    const paddingLeft = getPaddingLeft(isGrandParent, isParent)

                    const isDisabled = isParent || f._id === childFolderId

                    return (
                        <FolderListItem
                            key={f._id}
                            className={`${paddingLeft} ${isDisabled ? 'opacity-50 cursor-default' : ''} bg-zinc-800 border-zinc-950 ${isDisabled ? '' : 'hover:bg-zinc-700'} last-of-type:border-none`}
                            Icon={FolderIcon}
                            item={f}
                            onClick={() => onMove(f._id)}
                        >
                            <TruncatedTextDiv className="max-w-[200px] md:max-w-[400px] lg:max-w-[600px]">
                                {f.name}
                                {isParent ? ' (parent)' : ''}
                            </TruncatedTextDiv>
                        </FolderListItem>
                    )
                })}
            </UnorderedList>
        </Modal>
    )
}
