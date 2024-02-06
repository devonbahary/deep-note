import { FC } from 'react'
import { Modal } from '../../modal/Modal'
import { colors } from './colors'
import { ModalScrollableContent } from '../../modal/ModalScrollableContent'
import { ConfirmOrCancelButtons } from '../../modal/ConfirmOrCancelButtons'

type ColorModalProps = {
    onClose: () => void
    onColor: (color: string) => void
}

export const ColorModal: FC<ColorModalProps> = ({ onClose, onColor }) => {
    return (
        <Modal heading="Color" onClose={onClose}>
            <ModalScrollableContent className="bg-zinc-800">
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`bg-${color} h-14`}
                        onClick={() => onColor(color)}
                    />
                ))}
            </ModalScrollableContent>
            <ConfirmOrCancelButtons onCancel={onClose} />
        </Modal>
    )
}
