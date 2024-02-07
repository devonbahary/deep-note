import { FC, ReactNode } from 'react'

export const ListItem: FC<
    React.DetailedHTMLProps<
        React.LiHTMLAttributes<HTMLLIElement>,
        HTMLLIElement
    > & {
        icon: ReactNode
    }
> = ({ className, icon, children, ...props }) => {
    return (
        <li
            className={
                'flex gap-2 items-center cursor-pointer p-2 border-b-2 transition ease-out duration-200' +
                (className ? ` ${className}` : '')
            }
            {...props}
        >
            <div className="flex-none icon-box">{icon}</div>
            {children}
        </li>
    )
}
