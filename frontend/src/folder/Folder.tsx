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
    const addChildFolder = useAddChildFolder(folder._id)

    const addChildNote = useAddChildNote(folder._id)

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
                        className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
                        icon={<FolderAddIcon />}
                        onClick={() => addChildFolder()}
                    >
                        add folder
                    </ListItem>
                    <ListItem
                        className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
                        icon={<NoteAddIcon />}
                        onClick={() => addChildNote()}
                    >
                        add note
                    </ListItem>
                </UnorderedList>
            }
        />
    )
}
