import { useFolderAPI } from './hooks/useFolderAPI'
import { Header } from '../common/Header'
import { HeaderFolderItemContents } from '../common/HeaderFolderItemContents'
import { UnorderedList } from './UnorderedList'
import { FolderChildFolder } from './folder-child/FolderChildFolder'
import { FolderChildNote } from './folder-child/FolderChildNote'
import { ListItem } from './ListItem'
import FolderAddIcon from '../assets/folder-add-line.svg?react'
import NoteAddIcon from '../assets/file-add-line.svg?react'

export const Folder = () => {
    const {
        folder,
        addChildFolder,
        addChildNote,
        updateChildFolder,
        updateChildNote,
        deleteChildFolder,
        deleteChildNote,
    } = useFolderAPI()

    return (
        <div className="flex flex-col h-full w-full text-zinc-100">
            <Header>
                <HeaderFolderItemContents item={folder} />
            </Header>
            <UnorderedList className="grow bg-zinc-900">
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
        </div>
    )
}
