import { Folder, FolderWithFamily } from '../types/Folder'
import { Note } from '../types/Note'

export const canMoveFolderChild = (
    parentFolder: FolderWithFamily,
    folderChild: Folder | Note
): boolean => {
    if (parentFolder._parentFolderId) {
        return true
    }

    return parentFolder.folders.some((f) => f._id !== folderChild._id)
}
