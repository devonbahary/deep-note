import { FC, FunctionComponent, ReactNode, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { canMoveFolderChild } from '../utility'
import { Folder } from '../../types/Folder'
import { Note } from '../../types/Note'
import { UpdateFolderChildInput } from '../../types/types'
import { TextInput } from './TextInput'
import { DeleteFolderItemModal } from './delete-modal/DeleteFolderItemModal'
import { ColorModal } from './color-modal/ColorModal'
import { MoveToFolderModal } from './MoveToFolderModal'
import { FolderChildMenu } from './FolderChildMenu'
import { ListItem } from '../common/ListItem'
import MenuIcon from '../../assets/more-line.svg?react'

type SVGIcon = FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
        title?: string | undefined
    }
>

export type FolderChildProps = {
    Icon: SVGIcon
    navigateTo: () => void
    updateChild: (id: string, input: UpdateFolderChildInput) => void
    deleteChild: (id: string) => void
    parentFolder: Folder
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

    const onUpdateChild = async (input: UpdateFolderChildInput) => {
        await updateChild(child._id, input)
        reset()
    }

    const onDeleteChild = async () => {
        await deleteChild(child._id)
        reset()
    }

    const canMove = canMoveFolderChild(parentFolder, child)

    const iconClassName = child.tailwindColor
        ? `text-${child.tailwindColor}`
        : ''

    return (
        <ListItem
            className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
            icon={<Icon className={iconClassName} />}
            onClick={navigateTo}
        >
            <div className="flex w-full items-center">
                <div className="flex-grow">
                    <div className="max-w-[260px] md:max-w-[680px] lg:max-w-[880px] text-ellipsis text-nowrap overflow-hidden">
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
                    </div>
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
                        onUpdateChild({ parentFolderId: toParentId })
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
        </ListItem>
    )
}
