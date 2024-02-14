import { FC } from 'react'
import { useNavigation } from '../../common/hooks/useNavigateFolders'
import { FolderChild } from './FolderChild'
import { DeleteNoteModalContents } from './delete-modal/DeleteNoteModalContents'
import { Note } from '../../types/Note'
import { FolderWithFamily } from '../../types/Folder'
import {
    useClaimChildNote,
    useDeleteChildNote,
    useReparentChildNote,
    useUnclaimChildNote,
    useUpdateChildNote,
} from '../hooks/useFolderQueries'
import { ErrorPopup } from '../common/ErrorPopup'
import NoteIcon from '../../assets/file-text-fill.svg?react'

type FolderChildNoteProps = {
    note: Note
    parentFolder: FolderWithFamily
}

export const FolderChildNote: FC<FolderChildNoteProps> = ({
    note,
    parentFolder,
}) => {
    const { goToNote } = useNavigation()

    const {
        mutate: updateChildNote,
        isPending: isUpdatePending,
        error: updateError,
    } = useUpdateChildNote(parentFolder._id)

    const {
        mutate: reparentChildNote,
        isPending: isReparentPending,
        error: reparentError,
    } = useReparentChildNote(parentFolder._id)

    const {
        mutate: deleteChildNote,
        isPending: isDeletePending,
        error: deleteError,
    } = useDeleteChildNote(parentFolder._id)

    const {
        mutate: claimChildNote,
        isPending: isClaimPending,
        error: claimError,
    } = useClaimChildNote(parentFolder._id)

    const {
        mutate: unclaimChildNote,
        isPending: isUnclaimPending,
        error: unclaimError,
    } = useUnclaimChildNote(parentFolder._id)

    const isPending =
        isUpdatePending ||
        isReparentPending ||
        isDeletePending ||
        isClaimPending ||
        isUnclaimPending

    return (
        <>
            <FolderChild
                Icon={NoteIcon}
                child={note}
                editProps={{
                    nameInputPlaceholder: 'note name',
                    deleteModalHeading: 'Delete this note?',
                    deleteModalContents: (
                        <DeleteNoteModalContents note={note} />
                    ),
                }}
                navigateTo={() => goToNote(note._id)}
                parentFolder={parentFolder}
                reparentChild={reparentChildNote}
                updateChild={updateChildNote}
                deleteChild={deleteChildNote}
                claimChild={claimChildNote}
                unclaimChild={unclaimChildNote}
                isPending={isPending}
            />
            <ErrorPopup prependMsg="Failed to update:" error={updateError} />
            <ErrorPopup prependMsg="Failed to update:" error={reparentError} />
            <ErrorPopup prependMsg="Failed to delete:" error={deleteError} />
            <ErrorPopup
                prependMsg="Failed to mark private:"
                error={claimError}
            />
            <ErrorPopup
                prependMsg="Failed to mark public:"
                error={unclaimError}
            />
        </>
    )
}
