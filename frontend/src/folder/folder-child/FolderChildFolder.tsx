import { FC } from 'react'
import {
    useDeleteChildFolder,
    useReparentChildFolder,
    useUpdateChildFolder,
} from '../hooks/useFolderQueries'
import { useNavigation } from '../../common/hooks/useNavigateFolders'
import { FolderChild } from './FolderChild'
import { DeleteFolderModalContents } from './delete-modal/DeleteFolderModalContents'
import { Folder, FolderWithFamily } from '../../types/Folder'
import { ErrorPopup } from '../common/ErrorPopup'
import FolderIcon from '../../assets/folder-fill.svg?react'

type FolderChildFolderProps = {
    folder: Folder
    parentFolder: FolderWithFamily
}

export const FolderChildFolder: FC<FolderChildFolderProps> = ({
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

    const isPending = isUpdatePending || isReparentPending || isDeletePending

    return (
        <>
            <FolderChild
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
                isPending={isPending}
            />
            <ErrorPopup prependMsg="Failed to update:" error={updateError} />
            <ErrorPopup prependMsg="Failed to update:" error={reparentError} />
            <ErrorPopup prependMsg="Failed to delete:" error={deleteError} />
        </>
    )
}
