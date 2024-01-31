import { EditorContent } from '@tiptap/react'
import { Menu } from './Menu'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import './styles/note.css'

export const Note = () => {
    const editor = useTiptapEditor()

    return (
        <div className="flex flex-col h-full w-full">
            <div className="bg-zinc-950 text-zinc-100 h-12 items-center flex px-4 flex-none shadow-lg">
                Header
            </div>
            <Menu editor={editor} />
            <div
                className="grow bg-zinc-900 text-zinc-100"
                id="tip-tap-container"
            >
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
