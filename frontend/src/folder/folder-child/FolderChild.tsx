import { FC, ReactNode, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { canMoveFolderChild } from '../utility'
import { Folder, FolderWithFamily } from '../../types/Folder'
import { Note } from '../../types/Note'
import { SVGIcon, UpdateFolderChildInput } from '../../types/types'
import { TextInput } from './TextInput'
import { DeleteFolderItemModal } from './delete-modal/DeleteFolderItemModal'
import { ColorModal } from './color-modal/ColorModal'
import { MoveToFolderModal } from './MoveToFolderModal'
import { FolderChildMenu } from './FolderChildMenu'
import { TruncatedTextDiv } from '../../common/TruncatedTextDiv'
import { UpdateChild } from '../hooks/useFolderAPI'
import { FolderListItem } from '../FolderListItem'
import MenuIcon from '../../assets/more-line.svg?react'

export type FolderChildProps = {
    Icon: SVGIcon
    navigateTo: () => void
    updateChild: UpdateChild
    deleteChild: (id: string) => void
    parentFolder: FolderWithFamily
    child: Note | Folder
    editProps: EditProps
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
}

export const FolderChild: FC<FolderChildProps> = ({
    Icon,
    navigateTo,
    parentFolder,
    updateChild,
    deleteChild,
    child,
    editProps,
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

    const onUpdateChild = async (
        input: UpdateFolderChildInput,
        removeFromFolder = false
    ) => {
        await updateChild(child._id, input, removeFromFolder)
        reset()
    }

    const onDeleteChild = async () => {
        await deleteChild(child._id)
        reset()
    }

    const canMove = canMoveFolderChild(parentFolder, child)

    return (
        <FolderListItem
            className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
            Icon={Icon}
            item={child}
            onClick={navigateTo}
        >
            <div className="flex w-full items-center">
                <div className="flex-grow">
                    <TruncatedTextDiv className="max-w-[200px] xs:max-w-[300px] md:max-w-[660px] lg:max-w-[880px]">
                        {editMode === EditMode.Rename ? (
                            <TextInput
                                defaultValue={child.name}
                                onSubmit={async (name) =>
                                    onUpdateChild({ name })
                                }
                                placeholder={editProps.nameInputPlaceholder}
                            />
                        ) : (
                            child.name
                        )}
                    </TruncatedTextDiv>
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
                    canMove={canMove}
                    onClose={closeMenu}
                    onRename={() => beginEditing(EditMode.Rename)}
                    onColor={() => beginEditing(EditMode.Color)}
                    onMove={() => beginEditing(EditMode.Move)}
                    onDelete={() => beginEditing(EditMode.Delete)}
                />
            )}
            {editMode === EditMode.Color && (
                <ColorModal
                    onClose={reset}
                    onColor={(color: string) => {
                        onUpdateChild({ tailwindColor: color })
                    }}
                />
            )}
            {editMode === EditMode.Move && (
                <MoveToFolderModal
                    childFolderId={child._id}
                    parentFolder={parentFolder}
                    onClose={reset}
                    onMove={(toParentId: string) =>
                        onUpdateChild({ parentFolderId: toParentId }, true)
                    }
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
        </FolderListItem>
    )
}
