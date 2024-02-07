import { FC, ReactNode } from 'react'
import { useNavigateFolders } from './hooks/useNavigateFolders'
import ArrowLeftIcon from '../assets/arrow-left-line.svg?react'
import { TruncatedTextDiv } from './TruncatedTextDiv'

type HeaderFolderItemContentsProps = {
    _parentFolderId?: string
    children: ReactNode
}

export const HeaderFolderItemContents: FC<HeaderFolderItemContentsProps> = ({
    _parentFolderId,
    children,
}) => {
    const { goToFolder } = useNavigateFolders()

    const goToParentFolder = () => {
        if (_parentFolderId) goToFolder(_parentFolderId)
    }

    return (
        <>
            <button
                className={`flex-none icon-box ${_parentFolderId ? 'visible' : 'invisible'}`}
                onClick={goToParentFolder}
            >
                <ArrowLeftIcon />
            </button>
            <TruncatedTextDiv className="flex-1 max-w-[220px] xs:max-w-[320px] md:max-w-[660px] lg:max-w-[900px]">
                {children}
            </TruncatedTextDiv>
        </>
    )
}
