import { FC } from 'react'
import { NoteContent } from '../../../note/NoteContent'
import { Note } from '../../../types/Note'
import { useTiptapEditor } from '../../../note/hooks/useTiptapEditor'
import { ModalScrollableContent } from '../../modal/ModalScrollableContent'

type DeleteNoteModalContentsProps = {
    note: Note
}

export const DeleteNoteModalContents: FC<DeleteNoteModalContentsProps> = ({
    note,
}) => {
    const { editor } = useTiptapEditor(note.content ?? null, note._id, false)

    return (
        <ModalScrollableContent className="pt-2">
            <NoteContent editor={editor} />
        </ModalScrollableContent>
    )
}
