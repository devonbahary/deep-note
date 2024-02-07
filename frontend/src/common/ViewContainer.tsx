import { FC, ReactNode } from 'react'

type ViewContainerProps = {
    fixedContent: ReactNode
    scrollableContent?: ReactNode
}

export const ViewContainer: FC<ViewContainerProps> = ({
    fixedContent,
    scrollableContent,
}) => {
    return (
        <div className="fixed flex flex-col h-full w-full bg-zinc-900">
            <div className="flex-none">{fixedContent}</div>
            {scrollableContent && (
                <div className="flex-1 overflow-y-scroll">
                    {scrollableContent}
                </div>
            )}
        </div>
    )
}
