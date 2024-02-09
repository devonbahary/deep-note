import { Folder } from '../models/Folder'

export const validateParentFolder = async (parentFolderId?: string) => {
    if (parentFolderId) {
        const parentFolder = await Folder.findById(parentFolderId)

        if (!parentFolder) {
            throw new Error(
                `Could not find parent folder with id ${parentFolderId}`
            )
        }
    } else {
        throw new Error(
            `expected parentFolderId but received ${parentFolderId}`
        )
    }
}
