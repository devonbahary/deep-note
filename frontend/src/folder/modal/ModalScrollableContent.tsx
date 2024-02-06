import { DetailedHTMLProps, FC } from 'react'

export const ModalScrollableContent: FC<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...rest }) => {
    return (
        <div
            className={
                'max-h-[500px] min-w-[300px] overflow-y-scroll' +
                (className ? ` ${className}` : '')
            }
            {...rest}
        />
    )
}
