import clsx from 'clsx/lite'
import { FC } from 'react'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { UnorderedList } from './common/UnorderedList'
import { FolderChildFolder } from './folder-child/FolderChildFolder'
import { FolderChildNote } from './folder-child/FolderChildNote'
import { ListItem } from './common/ListItem'
import { ViewContainer } from '../common/ViewContainer'
import { useAddChildFolder, useAddChildNote } from './hooks/useFolderQueries'
import { FolderWithFamily } from '../types/Folder'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'

type FolderProps = {
    folder: FolderWithFamily
}

export const Folder: FC<FolderProps> = ({ folder }) => {
    const { mutate: addChildFolder, isPending: isAddFolderPending } =
        useAddChildFolder(folder._id)

    const { mutate: addChildNote, isPending: isAddNotePending } =
        useAddChildNote(folder._id)

    const liClassName = 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700'

    const addFolderClassName = clsx(
        liClassName,
        isAddFolderPending ? 'opacity-50 cursor-default' : 'hover:bg-zinc-800'
    )

    const addNoteClassName = clsx(
        liClassName,
        isAddNotePending ? 'opacity-50 cursor-default' : 'hover:bg-zinc-800'
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
                <UnorderedList className="grow bg-zinc-900 text-zinc-100">
                    {folder.folders.map((child) => (
                        <FolderChildFolder
                            key={child._id}
                            folder={child}
                            parentFolder={folder}
                        />
                    ))}
                    {folder.notes.map((child) => (
                        <FolderChildNote
                            key={child._id}
                            note={child}
                            parentFolder={folder}
                        />
                    ))}
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
            }
        />
    )
}
