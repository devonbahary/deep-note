import { FC, ReactNode } from 'react'

type EditCommandsMenuContainerProps = {
    children: ReactNode
}

export const EditCommandsMenuContainer: FC<EditCommandsMenuContainerProps> = ({
    children,
}) => (
    <div className="bg-zinc-900 px-4 py-2 shadow-lg shadow-zinc-950 relative">
        {children}
    </div>
)
