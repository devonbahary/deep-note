import clsx from 'clsx/lite'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import { useCreate } from '../../common/hooks/useApi'
import { Folder } from '../../types/Folder'
import { ErrorPopup } from './ErrorPopup'
import { useNavigation } from '../../common/hooks/useNavigateFolders'
import { useUnauthenticatedRootFolderId } from '../../common/hooks/useUnauthenticatedRootFolderId'
import AddFolderIcon from '../../assets/folder-add-fill.svg?react'

export const CreateRootFolderAction = () => {
    const create = useCreate<Folder, {}>('/api/folders')

    const { setUnauthenticatedRootFolderId } = useUnauthenticatedRootFolderId()

    const { isAuthenticated } = useAuth0()

    const { goToFolder } = useNavigation()

    const {
        mutate: createRootFolder,
        isPending,
        error,
    } = useMutation({
        mutationFn: () => create({}),
        onSuccess: (folder) => {
            if (!isAuthenticated) {
                setUnauthenticatedRootFolderId(folder._id)
            }

            goToFolder(folder._id)
        },
    })

    const onClick = async () => {
        if (!isPending) {
            await createRootFolder()
        }
    }

    const iconClassName = clsx(
        'w-48 h-48 text-zinc-400 hover:text-zinc-100 cursor-pointer transition ease-out duration-200 hover:-translate-y-2',
        isPending && 'animate-ping -translate-y-2 hover:text-zinc-400'
    )

    return (
        <div className="flex items-center justify-content flex-col">
            <AddFolderIcon className={iconClassName} onClick={onClick} />
            <p className="text-zinc-400">Create a folder</p>
            <ErrorPopup prependMsg="Failed to create:" error={error} />
        </div>
    )
}
