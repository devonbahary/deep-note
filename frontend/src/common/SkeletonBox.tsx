import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { getRandNum } from './skeletonUtility'

type SkeltonBoxProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    size: 'sm' | 'lg'
}

// keep these widths in sync with tailwind-safelist b/c dynamic classes won't bundle
const getWidthForSize = (size: 'sm' | 'lg') => {
    const rand = getRandNum(5)

    if (size === 'sm') {
        return 24 + 4 * rand // 24, 28, 32, 36, 40
    }

    return [56, 60, 64, 72, 80][rand]
}

export const SkeletonBox: FC<SkeltonBoxProps> = ({
    className,
    size,
    ...rest
}) => {
    const width = getWidthForSize(size)

    return (
        <div
            className={
                `animate-pulse w-${width} h-4 bg-zinc-500 rounded-md` +
                (className ? ` ${className}` : '')
            }
            {...rest}
        />
    )
}
