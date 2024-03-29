import { FC, ReactNode } from 'react'
import { Overlay } from '../common/Overlay'
import { Header } from '../../common/components/Header'
import { useCloseOnEscape } from '../../common/hooks/useCloseOnEscape'

type ModalProps = {
    children: ReactNode
    heading: string
    onClose: () => void
}

export const Modal: FC<ModalProps> = ({ children, heading, onClose }) => {
    useCloseOnEscape(onClose)

    return (
        <div
            className="fixed grid top-0 left-0 w-full h-full"
            onClick={(e) => e.stopPropagation()}
        >
            <Overlay onClick={() => onClose()} />
            <div className="bg-zinc-900 place-self-center rounded-md z-50">
                <Header>{heading}</Header>
                {children}
            </div>
        </div>
    )
}
