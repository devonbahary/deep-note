import { mongoose } from '../mongoose'
import { DEFAULT_NAME, FolderType } from '../models/Folder'
import {
    createFolder,
    deleteFolder,
    getFolder,
    getFolderDescendantsCount,
    getFolderWithFamily,
    updateFolder,
} from './foldersService'
import { createNote, getNote } from './notesService'

describe('foldsService', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('createFolder', () => {
        let parentFolderId: string

        beforeAll(async () => {
            const folder = await createFolder()
            parentFolderId = folder._id
        })

        it('a folder with no _parentFolderId should default to being named `root`', async () => {
            const folder = await createFolder()
            expect(folder.name).toBe('root')
        })

        it(`a folder with _parentFolderId should default to being named '${DEFAULT_NAME}'`, async () => {
            const folder = await createFolder(parentFolderId)
            expect(folder.name).toBe(DEFAULT_NAME)
        })
    })

    describe('getFolderDescendantsCount', () => {
        it('should return the total number of descendant folders and notes', async () => {
            const rootFolder = await createFolder()

            const folderDepth1 = await createFolder(rootFolder._id)
            await createNote(rootFolder._id)

            await createFolder(folderDepth1._id)
            await createFolder(folderDepth1._id)
            await createNote(folderDepth1._id)

            const descendantsCount = await getFolderDescendantsCount(
                rootFolder._id
            )

            expect(descendantsCount).toMatchObject({
                folders: 3,
                notes: 2,
            })
        })
    })

    describe('getFolderWithFamily', () => {
        it('should retrieve the folder with parent and all child items', async () => {
            const grandparentFolder = await createFolder()

            const folder = await createFolder(grandparentFolder._id)
            const parentFolderId = folder._id

            const childFolder = await createFolder(parentFolderId)
            const childNote = await createNote(parentFolderId)

            const folderWithParentAndChildren =
                await getFolderWithFamily(parentFolderId)

            expect(folderWithParentAndChildren.parent).toMatchObject(
                grandparentFolder.toJSON()
            )
            expect(folderWithParentAndChildren.folders).toContainEqual(
                childFolder.toJSON()
            )
            expect(folderWithParentAndChildren.notes).toContainEqual(
                childNote.toJSON()
            )
        })

        it('should retrieve the folder with no parent if does not exist and all child items', async () => {
            const folder = await createFolder()
            const parentFolderId = folder._id

            const childFolder = await createFolder(parentFolderId)
            const childNote = await createNote(parentFolderId)

            const folderWithParentAndChildren =
                await getFolderWithFamily(parentFolderId)

            expect(folderWithParentAndChildren.parent).toBeUndefined()
            expect(folderWithParentAndChildren.folders).toContainEqual(
                childFolder.toJSON()
            )
            expect(folderWithParentAndChildren.notes).toContainEqual(
                childNote.toJSON()
            )
        })
    })

    describe('updateFolder', () => {
        let folder: FolderType

        beforeAll(async () => {
            folder = await createFolder()
        })

        it('should update and trim the name field, returning the updated document', async () => {
            const name = 'name  '

            const updatedFolder = await updateFolder(folder._id, { name })

            expect(updatedFolder?.name).toBe(name.trim())
        })

        it('should update the _parentFolderId field, returning the updated document', async () => {
            const childFolderToBe = await createFolder()
            expect(childFolderToBe._parentFolderId).toBe(undefined)

            const updatedFolder = await updateFolder(childFolderToBe._id, {
                parentFolderId: folder._id,
            })
            expect(updatedFolder?._parentFolderId?.toString()).toBe(
                folder._id.toString()
            )
        })

        it('should not allow a folder to become its own parent', async () => {
            const folder = await createFolder()
            await expect(
                updateFolder(folder._id, { parentFolderId: folder._id })
            ).rejects.toThrow()
        })

        it('should update the tailwindColor field, returning the updated document', async () => {
            const tailwindColor = 'bg-red-500'

            const updatedFolder = await updateFolder(folder._id, {
                tailwindColor,
            })

            expect(updatedFolder?.tailwindColor).toBe(tailwindColor)
        })
    })

    describe('deleteFolder', () => {
        it('should delete the folder, all of its child notes and folders, and all of their child notes and folders recursively', async () => {
            const rootFolder = await createFolder()

            const folderDepth1 = await createFolder(rootFolder._id)
            const noteDepth1 = await createNote(rootFolder._id)

            const folder1Depth2 = await createFolder(folderDepth1._id)
            const folder2Depth2 = await createFolder(folderDepth1._id)
            const noteDepth2 = await createNote(folderDepth1._id)

            await deleteFolder(rootFolder._id)

            expect(await getFolder(rootFolder._id)).toBe(null)
            expect(await getFolder(folderDepth1._id)).toBe(null)
            expect(await getNote(noteDepth1._id)).toBe(null)
            expect(await getFolder(folder1Depth2._id)).toBe(null)
            expect(await getFolder(folder2Depth2._id)).toBe(null)
            expect(await getNote(noteDepth2._id)).toBe(null)
        })
    })
})
