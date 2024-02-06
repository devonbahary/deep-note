import { FC, ReactNode } from 'react'
import { Modal } from '../../modal/Modal'
import { ConfirmOrCancelButtons } from '../../modal/ConfirmOrCancelButtons'

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
        <Modal heading={heading} onClose={onClose}>
            {children}
            <ConfirmOrCancelButtons
                onCancel={() => onClose()}
                onConfirm={() => onDelete()}
            />
        </Modal>
    )
}
