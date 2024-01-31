import { FC, ReactNode } from 'react'

type MenuButtonProps = {
    children: ReactNode
    disabled?: boolean
    isActive?: boolean
    onClick: React.DOMAttributes<HTMLButtonElement>['onClick']
}

export const MenuButton: FC<MenuButtonProps> = ({
    children,
    disabled = false,
    isActive = false,
    onClick,
}) => {
    const className =
        'h-8 min-w-8 p-2 transition ease-out duration-200 rounded-lg border-2 border-zinc-900 hover:border-zinc-300' +
        (isActive
            ? ' bg-zinc-300 text-zinc-950 -translate-y-[2px]'
            : ' bg-zinc-800 text-zinc-300')

    return (
        <button className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
