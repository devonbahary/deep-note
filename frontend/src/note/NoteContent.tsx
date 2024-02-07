import clsx from 'clsx/lite'
import { FC } from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import './styles/note.css'

type NoteContentProps = {
    editor: Editor | null
}

export const NoteContent: FC<NoteContentProps> = ({ editor }) => {
    const className = clsx(
        'grow bg-zinc-900 min-h-full pt-4',
        editor?.options.editable ? 'text-zinc-100' : 'text-zinc-400'
    )

    return (
        <div className={className} id="tip-tap-container">
            <EditorContent editor={editor} />
        </div>
    )
}
