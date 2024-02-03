import { FC } from 'react'

type OverlayProps = {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Overlay: FC<OverlayProps> = ({ onClick }) => {
    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen bg-zinc-950 opacity-40"
            onClick={(e) => {
                e.stopPropagation()
                onClick(e)
            }}
        />
    )
}
