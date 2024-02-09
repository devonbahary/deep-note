import { FC, useEffect, useState } from 'react'
import { FolderDescendantsCount } from '../../../types/Folder'
import { useGet } from '../../../common/hooks/useApi'
import FolderIcon from '../../../assets/folder-fill.svg?react'
import NoteIcon from '../../../assets/file-text-fill.svg?react'

type DeleteFolderModalContentsProps = {
    folderId: string
}

export const DeleteFolderModalContents: FC<DeleteFolderModalContentsProps> = ({
    folderId,
}) => {
    const [folderDescendantsCount, setFolderDescendantsCount] =
        useState<FolderDescendantsCount | null>(null)

    // TODO: useQuery hook
    const get = useGet<FolderDescendantsCount>('/api/folders/descendants-count')

    useEffect(() => {
        const loadFolderDescendantsCount = async () => {
            const count = await get(folderId)
            setFolderDescendantsCount(count)
        }

        loadFolderDescendantsCount()
    }, [folderId])

    return (
        <div className="grid bg-zinc-900 text-zinc-100">
            {folderDescendantsCount && (
                <div className="place-self-center p-4">
                    This action will also delete everything in the folder.
                    <div className="flex gap-2 items-center justify-center">
                        <div className="icon-box">
                            <FolderIcon />
                        </div>
                        Folders: {folderDescendantsCount.folders}
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <div className="icon-box">
                            <NoteIcon />
                        </div>
                        Notes: {folderDescendantsCount.notes}
                    </div>
                </div>
            )}
        </div>
    )
}
