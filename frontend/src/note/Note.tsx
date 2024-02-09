import { FC } from 'react'
import { Note as NoteType } from '../types/Note'
import { useTiptapEditor } from './hooks/useTiptapEditor'
import { ViewContainer } from '../common/ViewContainer'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { EditorCommandsMenu } from './editor-commands-menu/EditCommandsMenu'
import { NoteContent } from './NoteContent'

type NoteProps = {
    note: NoteType
}

export const Note: FC<NoteProps> = ({ note }) => {
    const editor = useTiptapEditor(note.content ?? null, note._id, true)

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
            scrollableContent={<NoteContent editor={editor} />}
        />
    )
}
