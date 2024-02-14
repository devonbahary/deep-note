import { FC } from 'react'
import { FolderContentsCount } from '../../common/FolderContentsCount'
import { useGetFolderDescendantsCount } from '../../hooks/useFolderQueries'

type DeleteFolderModalContentsProps = {
    folderId: string
}

export const DeleteFolderModalContents: FC<DeleteFolderModalContentsProps> = ({
    folderId,
}) => {
    const { data: folderDescendantsCount } =
        useGetFolderDescendantsCount(folderId)

    return (
        <div className="grid bg-zinc-900 text-zinc-100">
            {folderDescendantsCount && (
                <div className="place-self-center p-4">
                    This action will also delete everything in the folder.
                    <FolderContentsCount
                        folders={folderDescendantsCount.folders}
                        notes={folderDescendantsCount.notes}
                    />
                </div>
            )}
        </div>
    )
}
