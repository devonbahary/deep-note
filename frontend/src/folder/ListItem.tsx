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
                'flex gap-2 items-center cursor-pointer p-2 border-b-2' +
                (className ? ` ${className}` : '')
            }
            {...props}
        >
            <div className="icon-box">{icon}</div>
            {children}
        </li>
    )
}
