import { Editor, JSONContent, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { useDebounce } from 'usehooks-ts'
import { content } from '../content'
import { useEffect, useState } from 'react'

type UseTiptapEditorResponse = Editor | null

export const useTiptapEditor = (): UseTiptapEditorResponse => {
    const [editorJSON, setEditorJSON] = useState<JSONContent | null>(null)
    const debouncedEditorJSON = useDebounce(editorJSON)

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
        editorProps: {
            attributes: {
                class: 'px-4 pb-4',
            },
        },
        onUpdate: ({ editor }) => {
            setEditorJSON(editor.getJSON())
        },
    })

    useEffect(() => {
        console.log(debouncedEditorJSON)
    }, [debouncedEditorJSON])

    return editor
}
