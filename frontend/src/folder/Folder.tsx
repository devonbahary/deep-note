import { FC } from 'react'
import { useFolderAPI } from './hooks/useFolderAPI'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { UnorderedList } from './common/UnorderedList'
import { FolderChildFolder } from './folder-child/FolderChildFolder'
import { FolderChildNote } from './folder-child/FolderChildNote'
import { ListItem } from './common/ListItem'
import { FolderWithFamily } from '../types/Folder'
import { ViewContainer } from '../common/ViewContainer'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'

type FolderProps = {
    folder: FolderWithFamily
}

export const Folder: FC<FolderProps> = ({ folder: loadedFolder }) => {
    const {
        folder,
        addChildFolder,
        addChildNote,
        updateChildFolder,
        updateChildNote,
        deleteChildFolder,
        deleteChildNote,
    } = useFolderAPI(loadedFolder)

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
                            updateChild={updateChildFolder}
                            deleteChild={deleteChildFolder}
                        />
                    ))}
                    {folder.notes.map((child) => (
                        <FolderChildNote
                            key={child._id}
                            note={child}
                            parentFolder={folder}
                            updateChild={updateChildNote}
                            deleteChild={deleteChildNote}
                        />
                    ))}
                    <ListItem
                        className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
                        icon={<FolderAddIcon />}
                        onClick={addChildFolder}
                    >
                        add folder
                    </ListItem>
                    <ListItem
                        className="bg-zinc-900 hover:bg-zinc-800 border-zinc-700"
                        icon={<NoteAddIcon />}
                        onClick={addChildNote}
                    >
                        add note
                    </ListItem>
                </UnorderedList>
            }
        />
    )
}
