import { Folder } from '../models/Folder'

export const validateParentFolder = async (parentFolderId: string) => {
    const parentFolder = await Folder.findById(parentFolderId)

    if (!parentFolder) {
        throw new Error(
            `Could not find parent folder with id ${parentFolderId}`
        )
    }
}
