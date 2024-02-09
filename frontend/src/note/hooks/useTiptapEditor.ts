import { useEffect, useState } from 'react'
import { Content, Editor, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { useDebounce } from 'usehooks-ts'
import { useUpdateContent } from './useNoteQueries'

type UseTipTapEditorResponse = {
    editor: Editor | null
    updateError: Error | null
}

export const useTiptapEditor = (
    content: Content,
    noteId: string,
    editable: boolean
): UseTipTapEditorResponse => {
    const [editorJSON, setEditorJSON] = useState<Content>(null)
    const debouncedEditorJSON = useDebounce(editorJSON)

    const { mutate: updateContent, error } = useUpdateContent(noteId)

    const editor = useEditor({
        extensions: [
            Placeholder.configure({
                placeholder: 'Text here..',
            }),
            StarterKit.configure({
                code: {
                    HTMLAttributes: {
                        class: 'bg-stone-950 px-0.5',
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-stone-950 p-1',
                    },
                },
            }),
            Underline,
        ],
        content,
        editable,
        editorProps: {
            attributes: {
                class: 'px-4 pb-4',
            },
        },
        onUpdate: ({ editor }) => setEditorJSON(editor.getJSON()),
    })

    useEffect(() => {
        const onDebouncedChange = async () => {
            await updateContent(debouncedEditorJSON)
        }

        if (editable) {
            onDebouncedChange()
        }
    }, [noteId, debouncedEditorJSON])

    return {
        editor,
        updateError: error,
    }
}
