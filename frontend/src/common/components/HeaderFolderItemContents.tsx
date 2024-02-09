import clsx from 'clsx/lite'
import { FC, ReactNode } from 'react'
import { useNavigation } from '../hooks/useNavigateFolders'
import { TruncatedTextDiv } from './TruncatedTextDiv'
import ArrowLeftIcon from '../../assets/arrow-left-line.svg?react'
import UserIcon from '../../assets/user-3-fill.svg?react'

type HeaderFolderItemContentsProps = {
    _parentFolderId?: string
    children: ReactNode
}

export const HeaderFolderItemContents: FC<HeaderFolderItemContentsProps> = ({
    _parentFolderId,
    children,
}) => {
    const { goToFolder, goToUser } = useNavigation()

    const goToParentFolder = () => {
        if (_parentFolderId) goToFolder(_parentFolderId)
    }

    const buttonClassName = clsx(
        'flex-none',
        'icon-box',
        _parentFolderId ? 'visible' : 'invisible'
    )

    return (
        <>
            <button className={buttonClassName} onClick={goToParentFolder}>
                <ArrowLeftIcon />
            </button>
            <TruncatedTextDiv className="flex-1 max-w-[220px] xs:max-w-[320px] md:max-w-[660px] lg:max-w-[900px]">
                {children}
            </TruncatedTextDiv>
            <button className="icon-box" onClick={goToUser}>
                <UserIcon />
            </button>
        </>
    )
}
