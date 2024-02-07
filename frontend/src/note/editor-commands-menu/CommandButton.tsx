import clsx from 'clsx/lite'
import { FC, ReactNode } from 'react'

type CommandButtonProps = {
    children: ReactNode
    disabled?: boolean
    isActive?: boolean
    onClick: React.DOMAttributes<HTMLButtonElement>['onClick']
}

export const CommandButton: FC<CommandButtonProps> = ({
    children,
    disabled = false,
    isActive = false,
    onClick,
}) => {
    const buttonClassName = clsx(
        'icon-box transition ease-out duration-200 rounded-lg border-2 border-zinc-900 hover:border-zinc-300',
        isActive
            ? 'bg-zinc-300 text-zinc-950 -translate-y-[2px]'
            : 'bg-zinc-800 text-zinc-300'
    )

    return (
        <button
            className={buttonClassName}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
