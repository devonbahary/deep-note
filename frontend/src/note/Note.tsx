import { useEffect, useState } from 'react'
import { Content, EditorContent } from '@tiptap/react'
import { useLoaderData } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Menu } from './Menu'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import { Note as NoteType } from '../types/Note'
import { updateNote } from '../api/notes'
import { Header } from '../common/Header'
import './styles/note.css'

export const Note = () => {
    const note = useLoaderData() as NoteType

    const [editorJSON, setEditorJSON] = useState<Content>(null)
    const debouncedEditorJSON = useDebounce(editorJSON)

    const editor = useTiptapEditor(note.content, ({ editor }) => {
        setEditorJSON(editor.getJSON())
    })

    useEffect(() => {
        ;(async () => {
            await updateNote(note._id, debouncedEditorJSON)
        })()
    }, [note._id, debouncedEditorJSON])

    return (
        <div className="flex flex-col h-full w-full">
            <Header name="Header" folderId={note._folderId} />
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
