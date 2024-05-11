import clsx from 'clsx/lite'
import { DetailedHTMLProps, FC } from 'react'

export const UnorderedList: FC<
    DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = ({ className, ...props }) => {
    const ulClassName = clsx('list-none p-0 shadow-md', className)
    return (
        <ul className={ulClassName} {...props}>
            { }
        </ul>
    )
}
