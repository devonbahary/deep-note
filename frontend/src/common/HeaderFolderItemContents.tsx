import { FC } from 'react'
import { useNavigateFolders } from './hooks/useNavigateFolders'
import { Note } from '../types/Note'
import { Folder } from '../types/Folder'
import ArrowLeftIcon from '../assets/arrow-left-line.svg?react'

type HeaderFolderItemContentsProps = {
    item: Folder | Note
}

export const HeaderFolderItemContents: FC<HeaderFolderItemContentsProps> = ({
    item: { _folderId, name },
}) => {
    const { goToFolder } = useNavigateFolders()

    const goToParentFolder = () => {
        if (_folderId) goToFolder(_folderId)
    }

    return (
        <>
            <button
                className={`icon-box ${_folderId ? 'visible' : 'invisible'}`}
                onClick={goToParentFolder}
            >
                <ArrowLeftIcon />
            </button>
            <div>{name}</div>
        </>
    )
}
