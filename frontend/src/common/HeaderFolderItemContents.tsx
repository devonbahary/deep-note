import { FC } from 'react'
import { useNavigateFolders } from './hooks/useNavigateFolders'
import { Note } from '../types/Note'
import { Folder } from '../types/Folder'
import ArrowLeftIcon from '../assets/arrow-left-line.svg?react'

type HeaderFolderItemContentsProps = {
    item: Folder | Note
}

export const HeaderFolderItemContents: FC<HeaderFolderItemContentsProps> = ({
    item: { _parentFolderId, name },
}) => {
    const { goToFolder } = useNavigateFolders()

    const goToParentFolder = () => {
        if (_parentFolderId) goToFolder(_parentFolderId)
    }

    return (
        <>
            <button
                className={`icon-box ${_parentFolderId ? 'visible' : 'invisible'}`}
                onClick={goToParentFolder}
            >
                <ArrowLeftIcon />
            </button>
            <div>{name}</div>
        </>
    )
}
