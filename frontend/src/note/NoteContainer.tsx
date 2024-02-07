import { FC, ReactNode } from 'react'

type NoteContainerProps = {
    children: ReactNode
}

export const NoteContainer: FC<NoteContainerProps> = ({ children }) => {
    return <div className="flex flex-col h-full w-full">{children}</div>
}
