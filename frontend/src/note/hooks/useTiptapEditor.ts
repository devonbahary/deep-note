import { useEffect, useState } from 'react'
import { Content, Editor } from '@tiptap/react'
import { useDebounce } from 'usehooks-ts'
import { useUpdateContent } from './useNoteQueries'
import { useConfiguredTiptapEditor } from './useConfiguredTiptapEditor'

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

    const editor = useConfiguredTiptapEditor(content, editable, ({ editor }) =>
        setEditorJSON(editor.getJSON())
    )

    useEffect(() => {
        const onDebouncedChange = async () => {
            await updateContent(debouncedEditorJSON)
        }

        if (editable) {
            onDebouncedChange()
        }
    }, [noteId, debouncedEditorJSON, editable, updateContent])

    return {
        editor,
        updateError: error,
    }
}
