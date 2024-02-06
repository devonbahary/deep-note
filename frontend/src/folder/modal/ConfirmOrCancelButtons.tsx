import { FC } from 'react'
import ConfirmIcon from '../../assets/check-line.svg?react'
import CancelIcon from '../../assets/close-line.svg?react'

type ConfirmOrCancelButtonsProps = {
    onConfirm?: () => void
    onCancel?: () => void
}

export const ConfirmOrCancelButtons: FC<ConfirmOrCancelButtonsProps> = ({
    onConfirm,
    onCancel,
}) => {
    return (
        <div className="flex bg-zinc-800 text-zinc-100 min-h-10 shadow-xl">
            {onCancel && (
                <button
                    className="grow grid border-r-2 border-zinc-900 hover:bg-zinc-500 last-of-type:border-none"
                    onClick={() => onCancel()}
                >
                    <div className="icon-box place-self-center">
                        <CancelIcon />
                    </div>
                </button>
            )}
            {onConfirm && (
                <button
                    className="grow grid border-r-2 border-zinc-900 hover:bg-zinc-500 last-of-type:border-none"
                    onClick={() => onConfirm()}
                >
                    <div className="icon-box place-self-center">
                        <ConfirmIcon />
                    </div>
                </button>
            )}
        </div>
    )
}
