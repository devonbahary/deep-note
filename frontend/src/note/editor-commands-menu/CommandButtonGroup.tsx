import { FC, ReactNode } from 'react'

type CommandButtonGroupProps = {
    children: ReactNode
}

export const CommandButtonGroup: FC<CommandButtonGroupProps> = ({
    children,
}) => {
    return (
        <div className="flex flex-row gap-2 mb-2 last-of-type:mb-0">
            {children}
        </div>
    )
}
