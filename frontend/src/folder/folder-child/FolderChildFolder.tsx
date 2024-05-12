import { FC } from 'react'
import {
    useClaimChildFolder,
    useDeleteChildFolder,
    useReparentChildFolder,
    useUnclaimChildFolder,
    useUpdateChildFolder,
} from '../hooks/useFolderQueries'
import { useNavigation } from '../../common/hooks/useNavigateFolders'
import { FolderChild } from './FolderChild'
import { DeleteFolderModalContents } from './delete-modal/DeleteFolderModalContents'
import { Folder, FolderWithFamily } from '../../types/Folder'
import { ErrorPopup } from '../common/ErrorPopup'
import FolderIcon from '../../assets/folder-fill.svg?react'

type FolderChildFolderProps = {
    className?: string
    folder: Folder
    parentFolder: FolderWithFamily
}

export const FolderChildFolder: FC<FolderChildFolderProps> = ({
    className,
    folder,
    parentFolder,
}) => {
    const { goToFolder } = useNavigation()

    const {
        mutate: updateChildFolder,
        isPending: isUpdatePending,
        error: updateError,
    } = useUpdateChildFolder(parentFolder._id)

    const {
        mutate: reparentChildFolder,
        isPending: isReparentPending,
        error: reparentError,
    } = useReparentChildFolder(parentFolder._id)

    const {
        mutate: deleteChildFolder,
        isPending: isDeletePending,
        error: deleteError,
    } = useDeleteChildFolder(parentFolder._id)

    const {
        mutate: claimChildFolder,
        isPending: isClaimPending,
        error: claimError,
    } = useClaimChildFolder(parentFolder._id)

    const {
        mutate: unclaimChildFolder,
        isPending: isUnclaimPending,
        error: unclaimError,
    } = useUnclaimChildFolder(parentFolder._id)

    const isPending =
        isUpdatePending ||
        isReparentPending ||
        isDeletePending ||
        isClaimPending ||
        isUnclaimPending

    return (
        <>
            <FolderChild
                className={className}
                Icon={FolderIcon}
                child={folder}
                editProps={{
                    nameInputPlaceholder: 'folder name',
                    deleteModalHeading: 'Delete this folder?',
                    deleteModalContents: (
                        <DeleteFolderModalContents folderId={folder._id} />
                    ),
                }}
                navigateTo={() => goToFolder(folder._id)}
                parentFolder={parentFolder}
                reparentChild={reparentChildFolder}
                updateChild={updateChildFolder}
                deleteChild={deleteChildFolder}
                claimChild={claimChildFolder}
                unclaimChild={unclaimChildFolder}
                isPending={isPending}
            />
            <ErrorPopup prependMsg="Failed to update:" error={updateError} />
            <ErrorPopup prependMsg="Failed to update:" error={reparentError} />
            <ErrorPopup prependMsg="Failed to delete:" error={deleteError} />
            <ErrorPopup
                prependMsg="Failed to mark private:"
                error={claimError}
            />
            <ErrorPopup
                prependMsg="Failed to mark public:"
                error={unclaimError}
            />
        </>
    )
}
