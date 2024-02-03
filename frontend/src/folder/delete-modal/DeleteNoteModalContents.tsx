import { FC } from 'react'
import { NoteContent } from '../../note/NoteContent'
import { Note } from '../../types/Note'
import { useTiptapEditor } from '../../note/hooks/useTiptapEditor'

type DeleteNoteModalContentsProps = {
    note: Note
}

export const DeleteNoteModalContents: FC<DeleteNoteModalContentsProps> = ({
    note,
}) => {
    const editor = useTiptapEditor(note.content, { editable: false })

    return (
        <div className="pt-2">
            <NoteContent editor={editor} />
        </div>
    )
}
