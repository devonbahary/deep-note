import { FC, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TruncatedTextDiv } from '../common/components/TruncatedTextDiv'
import { ListItem } from '../folder/common/ListItem'
import { DeleteFolderItemModal } from '../folder/folder-child/delete-modal/DeleteFolderItemModal'
import { DeleteFolderModalContents } from '../folder/folder-child/delete-modal/DeleteFolderModalContents'
import { Folder } from '../types/Folder'
import { useNavigation } from '../common/hooks/useNavigateFolders'
import { useDelete, useUpdate } from '../common/hooks/useApi'
import { useUnauthenticatedRootFolderId } from '../common/hooks/useUnauthenticatedRootFolderId'
import { ClaimFolderChildModal } from '../folder/folder-child/ClaimFolderChildModal'
import { ErrorPopup } from '../folder/common/ErrorPopup'
import DeleteIcon from '../assets/delete-bin-5-fill.svg?react'
import FolderIcon from '../assets/folder-fill.svg?react'
import LockIcon from '../assets/lock-fill.svg?react'
import UnlockIcon from '../assets/lock-unlock-fill.svg?react'

type RootFolderListItemProps = {
    folder: Folder
}

enum EditMode {
    Delete,
    Claim,
}

export const RootFolderListItem: FC<RootFolderListItemProps> = ({ folder }) => {
    const [editMode, setEditMode] = useState<EditMode | null>(null)

    const destroy = useDelete('/folders')

    const queryClient = useQueryClient()

    const { unauthenticatedRootFolderId, setUnauthenticatedRootFolderId } =
        useUnauthenticatedRootFolderId()

    const { mutate: deleteFolder, error: deleteFolderError } = useMutation({
        mutationFn: destroy,
        onSuccess: (_, id) => {
            if (id === unauthenticatedRootFolderId) {
                setUnauthenticatedRootFolderId(null)
            }
            queryClient.invalidateQueries({
                queryKey: ['user', 'root-folders'],
            })
        },
    })

    const updateClaimFolder = useUpdate<Folder, {}>(`/user/claim-folder`)

    const { mutate: claimFolder, error: claimFolderError } = useMutation({
        mutationFn: () => updateClaimFolder(folder._id, {}),
        onSuccess: (updatedFolder) => {
            queryClient.setQueryData(
                ['user', 'root-folders'],
                (oldData: Folder[]) =>
                    oldData.map((f) =>
                        f._id === folder._id ? updatedFolder : f
                    )
            )
        },
        onSettled: () => {
            reset()
        },
    })

    const reset = () => {
        setEditMode(null)
    }

    const { goToFolder } = useNavigation()

    return (
        <ListItem
            key={folder._id}
            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 last-of-type:border-none"
            icon={<FolderIcon />}
            onClick={() => goToFolder(folder._id.toString())}
        >
            <div className="flex-1">
                <TruncatedTextDiv className="flex-1 max-w-[180px] md:max-w-[280px]">
                    {folder._id}
                </TruncatedTextDiv>
            </div>
            <div className="flex text-zinc-400">
                {folder.userId ? (
                    <div
                        className="icon-box text-zinc-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <LockIcon />
                    </div>
                ) : (
                    <div
                        className="icon-box text-zinc-100"
                        onClick={(e) => {
                            e.stopPropagation()
                            setEditMode(EditMode.Claim)
                        }}
                    >
                        <UnlockIcon />
                    </div>
                )}
                <div
                    className="icon-box hover:text-zinc-100 transition ease-out duration-200"
                    onClick={(e) => {
                        e.stopPropagation()
                        setEditMode(EditMode.Delete)
                    }}
                >
                    <DeleteIcon />
                </div>
            </div>
            {editMode === EditMode.Delete && (
                <DeleteFolderItemModal
                    heading="Delete this folder?"
                    onClose={reset}
                    onDelete={() => deleteFolder(folder._id)}
                >
                    <DeleteFolderModalContents folderId={folder._id} />
                </DeleteFolderItemModal>
            )}
            {editMode === EditMode.Claim && (
                <ClaimFolderChildModal
                    item={folder}
                    onClose={reset}
                    onClaim={claimFolder}
                />
            )}
            <ErrorPopup
                error={deleteFolderError}
                prependMsg="Failed to delete:"
            />
            <ErrorPopup
                error={claimFolderError}
                prependMsg="Failed to mark private:"
            />
        </ListItem>
    )
}
