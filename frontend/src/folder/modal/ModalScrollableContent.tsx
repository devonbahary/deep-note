import clsx from 'clsx/lite'
import { DetailedHTMLProps, FC } from 'react'

export const ModalScrollableContent: FC<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...rest }) => {
    const divClassName = clsx(
        'max-h-[500px] min-w-[300px] overflow-y-scroll',
        className
    )
    return <div className={divClassName} {...rest} />
}
