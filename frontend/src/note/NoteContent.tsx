import { FC } from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import './styles/note.css'

type NoteContentProps = {
    editor: Editor | null
}

export const NoteContent: FC<NoteContentProps> = ({ editor }) => {
    return (
        <div
            className={`grow bg-zinc-900 min-h-full pt-4 ${editor?.options.editable ? ' text-zinc-100' : ' text-zinc-400'}`}
            id="tip-tap-container"
        >
            <EditorContent editor={editor} />
        </div>
    )
}
