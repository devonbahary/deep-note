import { FC } from 'react'
import {
    useDeleteChildFolder,
    useReparentChildFolder,
    useUpdateChildFolder,
} from '../hooks/useFolderQueries'
import { useNavigateFolders } from '../../common/hooks/useNavigateFolders'
import { FolderChild } from './FolderChild'
import { DeleteFolderModalContents } from './delete-modal/DeleteFolderModalContents'
import { Folder, FolderWithFamily } from '../../types/Folder'
import FolderIcon from '../../assets/folder-fill.svg?react'

type FolderChildFolderProps = {
    folder: Folder
    parentFolder: FolderWithFamily
}

export const FolderChildFolder: FC<FolderChildFolderProps> = ({
    folder,
    parentFolder,
}) => {
    const { goToFolder } = useNavigateFolders()

    const updateChildFolder = useUpdateChildFolder(parentFolder._id)

    const reparentChildFolder = useReparentChildFolder(parentFolder._id)

    const deleteChildFolder = useDeleteChildFolder(parentFolder._id)

    return (
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
        />
    )
}
