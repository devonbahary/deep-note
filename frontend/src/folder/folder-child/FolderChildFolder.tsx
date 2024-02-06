import { FC } from 'react'
import { useNavigateFolders } from '../../common/hooks/useNavigateFolders'
import { FolderChild, FolderChildProps } from './FolderChild'
import { DeleteFolderModalContents } from './delete-modal/DeleteFolderModalContents'
import { Folder } from '../../types/Folder'
import FolderIcon from '../../assets/folder-fill.svg?react'

type FolderChildFolderProps = Omit<
    FolderChildProps,
    'Icon' | 'editProps' | 'child' | 'navigateTo'
> & {
    folder: Folder
}

export const FolderChildFolder: FC<FolderChildFolderProps> = ({
    folder,
    ...rest
}) => {
    const { goToFolder } = useNavigateFolders()

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
            {...rest}
        />
    )
}
