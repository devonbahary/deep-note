import { useBoolean, useLocalStorage } from 'usehooks-ts'
import { createFolder } from '../api/folders'
import { useNavigateFolders } from '../common/hooks/useNavigateFolders'
import FolderIcon from '../assets/folder-line.svg?react'
import FolderAddIcon from '../assets/folder-add-line.svg?react'

export const LandingPage = () => {
    const [rootFolderId, setRootFolderId] = useLocalStorage<string | null>(
        'rootFolderId',
        null
    )

    const { value: isCreating, setTrue: setIsCreating } = useBoolean(false)

    const { goToFolder } = useNavigateFolders()

    const onCreateRootFolder = async () => {
        if (isCreating) return

        setIsCreating()

        const rootFolder = await createFolder()

        setRootFolderId(rootFolder._id)

        goToFolder(rootFolder._id)
    }

    const onClick = () => {
        if (rootFolderId) {
            goToFolder(rootFolderId)
        } else {
            onCreateRootFolder()
        }
    }

    const Icon = rootFolderId ? FolderIcon : FolderAddIcon

    return (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <div className="flex items-center justify-content flex-col">
                <Icon
                    className="w-48 h-48 text-zinc-400 hover:text-zinc-100 cursor-pointer transition ease-out duration-200 hover:-translate-y-2"
                    onClick={onClick}
                />
                <div className="text-zinc-400 text-center">
                    {rootFolderId ? (
                        <>
                            root folder
                            <br />
                            {rootFolderId}
                            <br />
                            <br />
                            Enter
                            <br />
                            <br />
                            <br />
                            <br />
                            <div
                                className="underline hover:text-zinc-100 cursor-pointer"
                                onClick={() => onCreateRootFolder()}
                            >
                                Create a new one?
                            </div>
                        </>
                    ) : (
                        'Create a new folder'
                    )}
                </div>
            </div>
        </div>
    )
}
