import { FC } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Folder } from '../../types/Folder'
import { Note } from '../../types/Note'
import { Modal } from '../modal/Modal'
import { belongsToUser } from '../../common/authUtility'
import { ConfirmOrCancelButtons } from '../modal/ConfirmOrCancelButtons'

type ClaimFolderChildModalProps = {
    item: Folder | Note
    onClose: () => void
    onClaim: () => void
    onUnclaim?: () => void
}

export const ClaimFolderChildModal: FC<ClaimFolderChildModalProps> = ({
    item,
    onClose,
    onClaim,
    onUnclaim,
}) => {
    const { user } = useAuth0()

    if (!user) {
        return null
    }

    const isMine = belongsToUser(item, user)
    const isUnauthorized = item.userId && !isMine

    const onConfirm = () => {
        if (isUnauthorized) return

        if (isMine && onUnclaim) {
            onUnclaim()
        } else if (!isMine) {
            onClaim()
        }
    }

    const heading = belongsToUser(item, user)
        ? 'Mark as public?'
        : 'Mark as private?'

    return (
        <Modal heading={heading} onClose={onClose}>
            <div className="p-4 text-zinc-300">
                {isMine ? (
                    <>
                        <p>This item belongs to you and is private.</p>
                        <br />
                        <p>
                            Mark this item as public so that you can share its
                            URL with others?
                        </p>
                    </>
                ) : isUnauthorized ? (
                    <>
                        <p>This item does not belong to you.</p>
                        <br />
                        <p>You cannot take any action against it.</p>
                    </>
                ) : (
                    <>
                        <p>This item belongs to no one and is public.</p>
                        <br />
                        <p>
                            Mark this item as yours and private so that only you
                            can see it?
                        </p>
                    </>
                )}
            </div>
            <ConfirmOrCancelButtons onCancel={onClose} onConfirm={onConfirm} />
        </Modal>
    )
}
