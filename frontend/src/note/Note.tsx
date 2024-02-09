import { FC } from 'react'
import { Note as NoteType } from '../types/Note'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import { ViewContainer } from '../common/components/ViewContainer'
import { Header } from '../common/components/Header'
import { HeaderFolderItemContents } from '../common/components/HeaderFolderItemContents'
import { EditorCommandsMenu } from './editor-commands-menu/EditCommandsMenu'
import { NoteContent } from './NoteContent'
import { ErrorPopup } from '../folder/common/ErrorPopup'

type NoteProps = {
    note: NoteType
}

export const Note: FC<NoteProps> = ({ note }) => {
    const { editor, updateError } = useTiptapEditor(
        note.content ?? null,
        note._id,
        true
    )

    return (
        <ViewContainer
            fixedContent={
                <>
                    <Header>
                        <HeaderFolderItemContents
                            _parentFolderId={note._parentFolderId}
                        >
                            {note.name}
                        </HeaderFolderItemContents>
                    </Header>
                    <EditorCommandsMenu editor={editor} />
                </>
            }
            scrollableContent={
                <>
                    <NoteContent editor={editor} />
                    <ErrorPopup
                        error={updateError}
                        prependMsg="Failed to update:"
                    />
                </>
            }
        />
    )
}
