import { Content, Editor, EditorOptions, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

type UseTipTapEditorOptions = {
    onUpdate?: EditorOptions['onUpdate']
    editable?: boolean
}

export const useTiptapEditor = (
    content: Content,
    options: UseTipTapEditorOptions
): Editor | null => {
    const { editable, onUpdate } = options
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
        onUpdate,
    })

    return editor
}
