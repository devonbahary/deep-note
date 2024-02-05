import { FC } from 'react'
import { useNavigateFolders } from '../../common/hooks/useNavigateFolders'
import { FolderChild, FolderChildProps } from './FolderChild'
import { DeleteNoteModalContents } from '../delete-modal/DeleteNoteModalContents'
import { Note } from '../../types/Note'
import NoteIcon from '../../assets/file-text-fill.svg?react'

type FolderChildNoteProps = Omit<
    FolderChildProps,
    'icon' | 'editProps' | 'child' | 'navigateTo'
> & {
    note: Note
}

export const FolderChildNote: FC<FolderChildNoteProps> = ({
    note,
    ...rest
}) => {
    const { goToNote } = useNavigateFolders()

    return (
        <FolderChild
            icon={<NoteIcon />}
            child={note}
            editProps={{
                nameInputPlaceholder: 'note name',
                deleteModalHeading: 'Delete this note?',
                deleteModalContents: <DeleteNoteModalContents note={note} />,
            }}
            navigateTo={() => goToNote(note._id)}
            {...rest}
        />
    )
}
