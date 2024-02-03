import { useEffect, useState } from 'react'
import { Content } from '@tiptap/react'
import { useLoaderData } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Menu } from './Menu'
import { NoteContent } from './NoteContent'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import { Note as NoteType } from '../types/Note'
import { updateNote } from '../api/notes'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'

export const Note = () => {
    const note = useLoaderData() as NoteType

    const [editorJSON, setEditorJSON] = useState<Content>(null)
    const debouncedEditorJSON = useDebounce(editorJSON)

    const editor = useTiptapEditor(note.content, {
        onUpdate: ({ editor }) => {
            setEditorJSON(editor.getJSON())
        },
    })

    useEffect(() => {
        const onDebouncedChange = async () => {
            await updateNote(note._id, { content: debouncedEditorJSON })
        }

        onDebouncedChange()
    }, [note._id, debouncedEditorJSON])

    return (
        <div className="flex flex-col h-full w-full">
            <Header>
                <HeaderFolderItemContents item={note} />
            </Header>
            <Menu editor={editor} />
            <NoteContent editor={editor} />
        </div>
    )
}
