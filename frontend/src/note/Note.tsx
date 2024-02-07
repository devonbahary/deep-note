import { FC, useEffect, useState } from 'react'
import { Content } from '@tiptap/react'
import { useDebounce } from 'usehooks-ts'
import { EditorCommandsMenu } from './editor-commands-menu/EditCommandsMenu'
import { NoteContent } from './NoteContent'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import { Note as NoteType } from '../types/Note'
import { updateNote } from '../api/notes'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { NoteContainer } from './NoteContainer'

type NoteProps = {
    note: NoteType
}

export const Note: FC<NoteProps> = ({ note }) => {
    const [editorJSON, setEditorJSON] = useState<Content>(null)
    const debouncedEditorJSON = useDebounce(editorJSON)

    const editor = useTiptapEditor(note.content ?? null, {
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
        <NoteContainer>
            <Header>
                <HeaderFolderItemContents
                    _parentFolderId={note._parentFolderId}
                >
                    {note.name}
                </HeaderFolderItemContents>
            </Header>
            <EditorCommandsMenu editor={editor} />
            <NoteContent editor={editor} />
        </NoteContainer>
    )
}
