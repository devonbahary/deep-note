import { ObjectId } from 'mongodb'
import { mongoose } from '../mongoose'
import { DEFAULT_NAME, FolderType } from '../models/Folder'
import {
    createFolder,
    deleteFolder,
    getFolderDescendantsCount,
    getFolderWithFamily,
    updateFolder,
} from '../services/foldersService'
import { createNote, updateNote } from '../services/notesService'
import {
    checkUpdatedItem,
    createFamily,
    createNoteWithContent,
    flattenFamily,
    getDescendantCount,
} from './testsUtility'

describe('foldersService', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('createFolder', () => {
        let parentFolderId: string

        beforeAll(async () => {
            const folder = await createFolder({})
            parentFolderId = folder._id
        })

        it('a folder with no _parentFolderId should default to being named `root`', async () => {
            const folder = await createFolder({})
            expect(folder.name).toBe('root')
        })

        it(`a folder with _parentFolderId should default to being named '${DEFAULT_NAME}'`, async () => {
            const folder = await createFolder({ parentFolderId })
            expect(folder.name).toBe(DEFAULT_NAME)
        })

        it(`should not create a folder with invalid parentFolderId`, async () => {
            const randomId = new ObjectId()
            await expect(
                createFolder({ parentFolderId: randomId.toString() })
            ).rejects.toThrow()
        })
    })

    describe('getFolderDescendantsCount', () => {
        it('should return the total number of descendant folders and notes', async () => {
            const family = await createFamily()

            const [[rootFolder], ...generations] = family

            const descendantsCount = await getFolderDescendantsCount(
                rootFolder._id
            )

            expect(descendantsCount).toMatchObject(
                getDescendantCount(generations)
            )
        })
    })

    describe('getFolderWithFamily', () => {
        it('should retrieve the folder with parent and all child items, hiding note content', async () => {
            const grandparentFolder = await createFolder({})

            const folder = await createFolder({
                parentFolderId: grandparentFolder._id,
            })
            const parentFolderId = folder._id

            const childFolder = await createFolder({ parentFolderId })
            const childNote = await createNoteWithContent(
                { parentFolderId },
                'this is content'
            )

            const folderWithParentAndChildren =
                await getFolderWithFamily(parentFolderId)

            expect(folderWithParentAndChildren.parent).toMatchObject(
                grandparentFolder.toJSON()
            )
            expect(folderWithParentAndChildren.folders).toContainEqual(
                childFolder.toJSON()
            )

            const expectedChildNote = folderWithParentAndChildren.notes.find(
                (n) => n._id.equals(childNote._id)
            )
            expect(expectedChildNote).toBeDefined()

            const match = { ...childNote?.toJSON() }
            delete match.content

            expect(expectedChildNote).toMatchObject(match)
            expect(expectedChildNote).not.toHaveProperty('content')
        })

        it('should retrieve the folder with no parent if does not exist and all child items, hiding note content', async () => {
            const folder = await createFolder({})
            const parentFolderId = folder._id

            const childFolder = await createFolder({ parentFolderId })
            const childNote = await createNoteWithContent(
                { parentFolderId },
                'this is content'
            )

            const folderWithParentAndChildren =
                await getFolderWithFamily(parentFolderId)

            expect(folderWithParentAndChildren.parent).toBeUndefined()
            expect(folderWithParentAndChildren.folders).toContainEqual(
                childFolder.toJSON()
            )

            const expectedChildNote = folderWithParentAndChildren.notes.find(
                (n) => n._id.equals(childNote._id)
            )
            expect(expectedChildNote).toBeDefined()

            const match = { ...childNote?.toJSON() }
            delete match.content

            expect(expectedChildNote).toMatchObject(match)
            expect(expectedChildNote).not.toHaveProperty('content')
        })
    })

    describe('updateFolder', () => {
        let folder: FolderType

        beforeAll(async () => {
            folder = await createFolder({})
        })

        it('should update and trim the name field, returning the updated document', async () => {
            const name = 'name  '

            const updatedFolder = await updateFolder(folder._id, { name })

            expect(updatedFolder?.name).toBe(name.trim())
        })

        it('should update the _parentFolderId field, returning the updated document', async () => {
            const childFolderToBe = await createFolder({})
            expect(childFolderToBe._parentFolderId).toBe(undefined)

            const updatedFolder = await updateFolder(childFolderToBe._id, {
                parentFolderId: folder._id,
            })
            expect(updatedFolder?._parentFolderId?.toString()).toBe(
                folder._id.toString()
            )
        })

        it('should not allow a folder to become its own parent', async () => {
            const folder = await createFolder({})
            await expect(
                updateFolder(folder._id, { parentFolderId: folder._id })
            ).rejects.toThrow()
        })

        it('should not update with an invalid parentFolderId', async () => {
            const folder = await createFolder({})

            const randomId = new ObjectId()

            await expect(
                updateFolder(folder._id, {
                    parentFolderId: randomId.toString(),
                })
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
            const [[rootFolder], ...generations] = await createFamily()

            await deleteFolder(rootFolder._id)

            await Promise.all(
                flattenFamily(generations).map((item) =>
                    checkUpdatedItem(item, (item) => expect(item).toBe(null))
                )
            )
        })
    })
})
