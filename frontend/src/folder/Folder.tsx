import clsx from 'clsx/lite'
import { FC } from 'react'
import { Header } from '../common/components/Header'
import { HeaderFolderItemContents } from '../common/components/HeaderFolderItemContents'
import { UnorderedList } from './common/UnorderedList'
import { FolderChildFolder } from './folder-child/FolderChildFolder'
import { FolderChildNote } from './folder-child/FolderChildNote'
import { ListItem } from './common/ListItem'
import { ViewContainer } from '../common/components/ViewContainer'
import { useAddChildFolder, useAddChildNote } from './hooks/useFolderQueries'
import { FolderWithFamily } from '../types/Folder'
import { ErrorPopup } from './common/ErrorPopup'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'

type FolderProps = {
    folder: FolderWithFamily
}

const MAX_DELAY = 5000; // corresponds with tailwind-safelist.js

const getDelay = (count: number) => `[--fadeIn-delay:${Math.min(count * 50, MAX_DELAY)}ms]`;

export const Folder: FC<FolderProps> = ({ folder }) => {
    const {
        mutate: addChildFolder,
        isPending: isAddFolderPending,
        error: addFolderError,
    } = useAddChildFolder(folder._id)

    const {
        mutate: addChildNote,
        isPending: isAddNotePending,
        error: addNoteError,
    } = useAddChildNote(folder._id)

    const liClassName = 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700'

    const totalChildren = folder.folders.length + folder.notes.length;

    const addFolderClassName = clsx(
        liClassName,
        isAddFolderPending ? 'opacity-50 cursor-default' : 'hover:bg-zinc-800',
        `animate-fadeIn opacity-0 ${getDelay(totalChildren)}`
    )

    const addNoteClassName = clsx(
        liClassName,
        isAddNotePending ? 'opacity-50 cursor-default' : 'hover:bg-zinc-800',
        `animate-fadeIn opacity-0 ${getDelay(totalChildren + 1)}`
    )

    return (
        <ViewContainer
            fixedContent={
                <Header>
                    <HeaderFolderItemContents
                        _parentFolderId={folder._parentFolderId}
                    >
                        {folder.name}
                    </HeaderFolderItemContents>
                </Header>
            }
            scrollableContent={
                <>
                    <UnorderedList className="grow bg-zinc-900 text-zinc-100">
                        {folder.folders.map((child, index) => (
                            <FolderChildFolder
                                key={child._id}
                                className={`animate-fadeIn opacity-0 ${getDelay(index)}`}
                                folder={child}
                                parentFolder={folder}
                            />
                        )
                        )}
                        {folder.notes.map((child, index) => (
                            <FolderChildNote
                                key={child._id}
                                className={`animate-fadeIn opacity-0 ${getDelay(folder.folders.length + index)}`}
                                note={child}
                                parentFolder={folder}
                            />
                        )
                        )}
                        <ListItem
                            className={addFolderClassName}
                            icon={<FolderAddIcon />}
                            onClick={() => {
                                if (!isAddFolderPending) addChildFolder()
                            }}
                        >
                            add folder
                        </ListItem>
                        <ListItem
                            className={addNoteClassName}
                            icon={<NoteAddIcon />}
                            onClick={() => {
                                if (!isAddNotePending) addChildNote()
                            }}
                        >
                            add note
                        </ListItem>
                    </UnorderedList>
                    <ErrorPopup
                        prependMsg="Failed to add folder:"
                        error={addFolderError}
                    />
                    <ErrorPopup
                        prependMsg="Failed to add note:"
                        error={addNoteError}
                    />
                </>
            }
        />
    )
}
