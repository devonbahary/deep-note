import { FC, ReactNode } from 'react'

type FolderContainerProps = {
    children: ReactNode
}

export const FolderContainer: FC<FolderContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-full w-full text-zinc-100">
            {children}
        </div>
    )
}
