import clsx from 'clsx/lite'
import { FC, ReactNode, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { canMoveFolderChild } from '../utility'
import { Folder, FolderWithFamily } from '../../types/Folder'
import { ReparentInput } from '../hooks/useFolderQueries'
import { Note } from '../../types/Note'
import { SVGIcon, UpdateFolderChildInput } from '../../types/types'
import { TextInput } from './TextInput'
import { DeleteFolderItemModal } from './delete-modal/DeleteFolderItemModal'
import { ColorModal } from './color-modal/ColorModal'
import { MoveToFolderModal } from './MoveToFolderModal'
import { FolderChildMenu } from './FolderChildMenu'
import { TruncatedTextDiv } from '../../common/components/TruncatedTextDiv'
import { FolderListItem } from '../FolderListItem'
import { ClaimFolderChildModal } from './ClaimFolderChildModal'
import LockIcon from '../../assets/lock-fill.svg?react'
import MenuIcon from '../../assets/more-line.svg?react'

type FolderChildProps = {
    className?: string
    Icon: SVGIcon
    navigateTo: () => void
    updateChild: (input: UpdateFolderChildInput) => void
    reparentChild: (input: ReparentInput) => void
    deleteChild: (id: string) => void
    claimChild: (id: string) => void
    unclaimChild: (id: string) => void
    parentFolder: FolderWithFamily
    child: Note | Folder
    editProps: EditProps
    isPending: boolean
}

type EditProps = {
    deleteModalHeading: string
    deleteModalContents: ReactNode
    nameInputPlaceholder: string
}

enum EditMode {
    Rename,
    Color,
    Move,
    Delete,
    Claim,
}

export const FolderChild: FC<FolderChildProps> = ({
    className,
    Icon,
    navigateTo,
    parentFolder,
    reparentChild,
    updateChild,
    deleteChild,
    claimChild,
    unclaimChild,
    child,
    editProps,
    isPending,
}) => {
    const {
        value: isMenuOpen,
        setFalse: closeMenu,
        setTrue: openMenu,
    } = useBoolean(false)

    const [editMode, setEditMode] = useState<EditMode | null>(null)

    const reset = () => {
        setEditMode(null)
        closeMenu()
    }

    const beginEditing = (editMode: EditMode) => {
        setEditMode(editMode)
        closeMenu()
    }

    const onReparentChild = async (parentFolderId: string) => {
        await reparentChild({ id: child._id, parentFolderId })
        reset()
    }

    const onUpdateChild = async (input: UpdateFolderChildInput) => {
        await updateChild(input)
        reset()
    }

    const onClaimChild = async () => {
        await claimChild(child._id)
        reset()
    }

    const onUnclaimChild = async () => {
        await unclaimChild(child._id)
        reset()
    }

    const onDeleteChild = async () => {
        await deleteChild(child._id)
        reset()
    }

    const canMove = canMoveFolderChild(parentFolder, child)

    return (
        <FolderListItem
            className={
                clsx(
                    className,
                    "bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
                )
            }
            Icon={Icon}
            item={child}
            onClick={navigateTo}
            isPending={isPending}
        >
            <div className="flex w-full items-center">
                <div className="flex-grow">
                    <TruncatedTextDiv className="max-w-[180px] xs:max-w-[280px] md:max-w-[620px] lg:max-w-[880px]">
                        {editMode === EditMode.Rename ? (
                            <TextInput
                                defaultValue={child.name}
                                onSubmit={async (name) =>
                                    onUpdateChild({ id: child._id, name })
                                }
                                placeholder={editProps.nameInputPlaceholder}
                            />
                        ) : (
                            child.name
                        )}
                    </TruncatedTextDiv>
                </div>
                <div
                    className="icon-box text-zinc-400"
                    onClick={(e) => e.stopPropagation()}
                >
                    {child.userId && <LockIcon />}
                </div>
                <div
                    className="icon-box"
                    onClick={(e) => {
                        e.stopPropagation()
                        openMenu()
                    }}
                >
                    <MenuIcon />
                </div>
            </div>
            {isMenuOpen && (
                <FolderChildMenu
                    child={child}
                    canMove={canMove}
                    onClose={closeMenu}
                    onRename={() => beginEditing(EditMode.Rename)}
                    onColor={() => beginEditing(EditMode.Color)}
                    onMove={() => beginEditing(EditMode.Move)}
                    onDelete={() => beginEditing(EditMode.Delete)}
                    onToggleClaim={() => beginEditing(EditMode.Claim)}
                />
            )}
            {editMode === EditMode.Color && (
                <ColorModal
                    onClose={reset}
                    onColor={(color: string) => {
                        onUpdateChild({ id: child._id, tailwindColor: color })
                    }}
                />
            )}
            {editMode === EditMode.Move && (
                <MoveToFolderModal
                    childFolderId={child._id}
                    parentFolder={parentFolder}
                    onClose={reset}
                    onMove={onReparentChild}
                />
            )}
            {editMode === EditMode.Delete && (
                <DeleteFolderItemModal
                    heading={editProps.deleteModalHeading}
                    onClose={reset}
                    onDelete={onDeleteChild}
                >
                    {editProps.deleteModalContents}
                </DeleteFolderItemModal>
            )}
            {editMode === EditMode.Claim && (
                <ClaimFolderChildModal
                    item={child}
                    onClose={reset}
                    onClaim={() => onClaimChild()}
                    onUnclaim={() => onUnclaimChild()}
                />
            )}
        </FolderListItem>
    )
}
