import clsx from 'clsx/lite'
import { FC, ReactNode } from 'react'

export type ListItemProps = React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
> & {
    icon: ReactNode
}

export const ListItem: FC<ListItemProps> = ({
    className,
    icon,
    children,
    ...props
}) => {
    const liClassName = clsx(
        'flex gap-2 items-center cursor-pointer p-2 border-b-2 transition ease-out duration-200',
        className
    )

    return (
        <li className={liClassName} {...props}>
            <div className="flex-none icon-box">{icon}</div>
            {children}
        </li>
    )
}
