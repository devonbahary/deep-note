import { FC, ReactNode } from 'react'

type CommandButtonGroupProps = {
    children: ReactNode
}

export const CommandButtonGroup: FC<CommandButtonGroupProps> = ({
    children,
}) => {
    return <div className="flex flex-row gap-2">{children}</div>
}
