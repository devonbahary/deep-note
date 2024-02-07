import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

// text-ellipsis requires fixed width, so pass max-w className for this to work
export const TruncatedTextDiv: FC<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...rest }) => {
    return (
        <div
            className={
                'text-ellipsis text-nowrap overflow-hidden' +
                (className ? ` ${className}` : '')
            }
            {...rest}
        />
    )
}
