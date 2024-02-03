import { DetailedHTMLProps, FC } from 'react'

export const UnorderedList: FC<
    DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
> = ({ className, ...props }) => {
    return (
        <ul
            className={'list-none p-0' + (className ? ` ${className}` : '')}
            {...props}
        >
            {}
        </ul>
    )
}
