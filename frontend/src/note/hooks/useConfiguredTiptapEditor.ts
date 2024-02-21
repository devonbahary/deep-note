import { Content, EditorOptions, useEditor } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

export const useConfiguredTiptapEditor = (
    content: Content,
    editable: boolean,
    onUpdate: EditorOptions['onUpdate']
) => {
    return useEditor({
        extensions: [
            Link.configure({
                HTMLAttributes: {
                    class: 'link',
                },
            }),
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
        onUpdate,
    })
}
