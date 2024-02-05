import { Folder } from '../types/Folder'
import { Note } from '../types/Note'

export const canMoveFolderChild = (
    parentFolder: Folder,
    folderChild: Folder | Note
): boolean => {
    if (parentFolder._folderId) {
        return true
    }

    return parentFolder.folders.some((f) => f._id !== folderChild._id)
}
