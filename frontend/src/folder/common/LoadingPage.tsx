import FolderIcon from '../../assets/folder-fill.svg?react'

export const LoadingPage = () => {
    return (
        <div className="bg-zinc-900 flex justify-center items-center text-zinc-100 w-full h-full">
            <div className="w-24 h-24">
                <FolderIcon className="animate-ping" />
            </div>
        </div>
    )
}
