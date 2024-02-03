import { FC } from 'react'

export const FolderChildListItem: FC<
    React.DetailedHTMLProps<
        React.LiHTMLAttributes<HTMLLIElement>,
        HTMLLIElement
    >
> = ({ className, ...props }) => {
    return (
        <li
            className={
                'flex gap-2 items-center p-2 cursor-pointer' +
                (className ? ` ${className}` : '')
            }
            {...props}
        ></li>
    )
}
