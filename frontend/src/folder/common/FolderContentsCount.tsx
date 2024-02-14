import { FC } from 'react'
import { FolderDescendantsCount } from '../../types/Folder'
import FolderIcon from '../../assets/folder-fill.svg?react'
import NoteIcon from '../../assets/file-text-fill.svg?react'

type FolderContentsCountProps = Pick<
    FolderDescendantsCount,
    'folders' | 'notes'
>

export const FolderContentsCount: FC<FolderContentsCountProps> = ({
    folders,
    notes,
}) => {
    return (
        <div className="grid p-2">
            <div className="flex place-self-center gap-2">
                <div className="flex items-center">
                    <div className="icon-box">
                        <FolderIcon />
                    </div>
                    {folders}
                </div>
                <div className="flex items-center">
                    <div className="icon-box">
                        <NoteIcon />
                    </div>
                    {notes}
                </div>
            </div>
        </div>
    )
}
