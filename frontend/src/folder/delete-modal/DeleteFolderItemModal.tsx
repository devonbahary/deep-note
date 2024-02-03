import { FC, ReactNode } from 'react'
import { Overlay } from '../Overlay'
import { Header } from '../../common/Header'
import ConfirmIcon from '../../assets/check-line.svg?react'
import CancelIcon from '../../assets/close-line.svg?react'

type DeleteFolderItemModalProps = {
    children: ReactNode
    heading: string
    onClose: () => void
    onDelete: () => void
}

export const DeleteFolderItemModal: FC<DeleteFolderItemModalProps> = ({
    children,
    heading,
    onClose,
    onDelete,
}) => {
    return (
        <div className="fixed grid top-0 left-0 w-full h-full">
            <Overlay onClick={() => onClose()} />
            <div className="bg-zinc-900 place-self-center rounded-md z-50">
                <Header>{heading}</Header>
                {children}
                <div className="flex bg-zinc-800 text-zinc-100 min-h-10">
                    <button
                        className="grow grid border-r-2 border-zinc-900 hover:bg-zinc-500"
                        onClick={() => onClose()}
                    >
                        <div className="icon-box place-self-center">
                            <CancelIcon />
                        </div>
                    </button>
                    <button
                        className="grow grid hover:bg-zinc-500"
                        onClick={() => onDelete()}
                    >
                        <div className="icon-box place-self-center">
                            <ConfirmIcon />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
