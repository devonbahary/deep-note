import { FC } from 'react'
import { useNavigateFolders } from '../../common/hooks/useNavigateFolders'
import { FolderChild } from './FolderChild'
import { DeleteNoteModalContents } from './delete-modal/DeleteNoteModalContents'
import { Note } from '../../types/Note'
import { FolderWithFamily } from '../../types/Folder'
import {
    useDeleteChildNote,
    useReparentChildNote,
    useUpdateChildNote,
} from '../hooks/useFolderQueries'
import NoteIcon from '../../assets/file-text-fill.svg?react'

type FolderChildNoteProps = {
    note: Note
    parentFolder: FolderWithFamily
}

export const FolderChildNote: FC<FolderChildNoteProps> = ({
    note,
    parentFolder,
}) => {
    const { goToNote } = useNavigateFolders()

    const updateChildNote = useUpdateChildNote(parentFolder._id)

    const reparentChildNote = useReparentChildNote(parentFolder._id)

    const deleteChildNote = useDeleteChildNote(parentFolder._id)

    return (
        <FolderChild
            Icon={NoteIcon}
            child={note}
            editProps={{
                nameInputPlaceholder: 'note name',
                deleteModalHeading: 'Delete this note?',
                deleteModalContents: <DeleteNoteModalContents note={note} />,
            }}
            navigateTo={() => goToNote(note._id)}
            parentFolder={parentFolder}
            reparentChild={reparentChildNote}
            updateChild={updateChildNote}
            deleteChild={deleteChildNote}
        />
    )
}
