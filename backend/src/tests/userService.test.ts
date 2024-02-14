import { ObjectId } from 'mongodb'
import { mongoose } from '../mongoose'
import { createFolder } from '../services/foldersService'
import { createNote } from '../services/notesService'
import {
    claimFolderAndDescendants,
    getUserRootFolders,
    unclaimFolderAndDescendants,
} from '../services/userService'
import {
    checkUpdatedItem,
    createFamily,
    flattenFamily,
    getMockRequest,
} from './testsUtility'

describe('userService', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('getUserRootFolders', () => {
        it('should return an empty array when no root folders exist belonging to user', async () => {
            const userId = Math.random().toString()

            await createFolder({ userId: 'someone else' })

            const req = getMockRequest(userId)
            const result = await getUserRootFolders(req)

            expect(result).toHaveLength(0)
        })

        it('should return at least the unauthenticatedRootFolder when passed', async () => {
            const userId = Math.random().toString()

            const unauthenticatedRootFolder = await createFolder({})

            const req = getMockRequest(userId)
            const results = await getUserRootFolders(
                req,
                unauthenticatedRootFolder._id
            )

            expect(results).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(unauthenticatedRootFolder.toJSON()),
                ])
            )
        })

        it('should not return a non-existent unauthenticatedRootFolder when passed', async () => {
            const userId = Math.random().toString()

            const randId = new ObjectId().toString()

            const req = getMockRequest(userId)
            const results = await getUserRootFolders(req, randId)

            expect(results).toHaveLength(0)
        })

        it('should return all root folders belonging to user and a valid unauthenticatedRootFolderId', async () => {
            const userId = Math.random().toString()

            const unauthenticatedRootFolder = await createFolder({})

            const rootFolderA = await createFolder({ userId })
            const rootFolderB = await createFolder({ userId })

            const req = getMockRequest(userId)
            const results = await getUserRootFolders(
                req,
                unauthenticatedRootFolder._id
            )

            expect(results.length).toBe(3)

            expect(results).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(rootFolderA.toJSON()),
                    expect.objectContaining(rootFolderB.toJSON()),
                    expect.objectContaining(unauthenticatedRootFolder.toJSON()),
                ])
            )
        })
    })

    describe('claimFolderAndDescendants', () => {
        it('should throw an error if attempting to claim a folder claimed by another', async () => {
            const userId = Math.random().toString()

            const folder = await createFolder({ userId: 'someone else' })

            await expect(
                claimFolderAndDescendants(userId, folder)
            ).rejects.toThrow()
        })

        it('should update the userId for a folder and all its descendants', async () => {
            const userId = Math.random().toString()

            const family = await createFamily()

            const rootFolder = family[0][0]

            await claimFolderAndDescendants(userId, rootFolder)

            await Promise.all(
                flattenFamily(family).map((item) =>
                    checkUpdatedItem(item, (updatedItem) =>
                        expect(updatedItem?.userId).toBe(userId)
                    )
                )
            )
        })
    })

    it('should update the userId for a folder and all its authorized descendants', async () => {
        const userId = Math.random().toString()
        const anotherUserId = Math.random().toString()

        const rootFolder = await createFolder({})

        const secondGenerationFolder = await createFolder({
            parentFolderId: rootFolder._id,
        })
        const secondGenerationNote = await createNote({
            parentFolderId: rootFolder._id,
        })
        const secondGenerationFolderUnauthorized = await createFolder({
            parentFolderId: rootFolder._id,
            userId: anotherUserId,
        })
        const secondGenerationNoteUnauthorized = await createNote({
            parentFolderId: rootFolder._id,
            userId: anotherUserId,
        })

        const thirdGenerationFolder = await createFolder({
            parentFolderId: secondGenerationFolder._id,
        })
        const thirdGenerationNote = await createNote({
            parentFolderId: secondGenerationFolder._id,
        })
        const thirdGenerationFolderUnauthorized = await createFolder({
            parentFolderId: secondGenerationFolderUnauthorized._id,
        })
        const thirdGenerationNoteUnauthorized = await createNote({
            parentFolderId: secondGenerationFolderUnauthorized._id,
        })

        await claimFolderAndDescendants(userId, rootFolder)

        const expectedUserIdItems = [
            rootFolder,
            secondGenerationFolder,
            secondGenerationNote,
            thirdGenerationFolder,
            thirdGenerationNote,
        ]
        await Promise.all(
            expectedUserIdItems.map(async (item) =>
                checkUpdatedItem(item, (item) =>
                    expect(item?.userId).toBe(userId)
                )
            )
        )

        const expectedAnotherUserIdItems = [
            secondGenerationFolderUnauthorized,
            secondGenerationNoteUnauthorized,
            thirdGenerationFolderUnauthorized,
            thirdGenerationNoteUnauthorized,
        ]
        await Promise.all(
            expectedAnotherUserIdItems.map(async (item) =>
                checkUpdatedItem(item, (item) =>
                    expect(item?.userId).not.toBe(userId)
                )
            )
        )
    })

    describe('unclaimFolderAndDescendants', () => {
        it('should throw an error if attempting to unclaim a folder claimed by another', async () => {
            const userId = Math.random().toString()

            const folder = await createFolder({ userId: 'someone else' })

            await expect(
                unclaimFolderAndDescendants(userId, folder)
            ).rejects.toThrow()
        })

        it('should remove the userId for a folder and all its descendants', async () => {
            const userId = Math.random().toString()

            const family = await createFamily(userId)

            const rootFolder = family[0][0]

            await unclaimFolderAndDescendants(userId, rootFolder)

            await Promise.all(
                flattenFamily(family).map((item) =>
                    checkUpdatedItem(item, (item) =>
                        expect(item?.userId).toBe(null)
                    )
                )
            )
        })

        it('should remove the userId for a folder and all its authorized descendants', async () => {
            const userId = Math.random().toString()
            const anotherUserId = Math.random().toString()

            const rootFolder = await createFolder({})

            const secondGenerationFolder = await createFolder({
                parentFolderId: rootFolder._id,
            })
            const secondGenerationNote = await createNote({
                parentFolderId: rootFolder._id,
            })
            const secondGenerationFolderUnauthorized = await createFolder({
                parentFolderId: rootFolder._id,
                userId: anotherUserId,
            })
            const secondGenerationNoteUnauthorized = await createNote({
                parentFolderId: rootFolder._id,
                userId: anotherUserId,
            })

            const thirdGenerationFolder = await createFolder({
                parentFolderId: secondGenerationFolder._id,
            })
            const thirdGenerationNote = await createNote({
                parentFolderId: secondGenerationFolder._id,
            })
            const thirdGenerationFolderUnauthorized = await createFolder({
                parentFolderId: secondGenerationFolderUnauthorized._id,
                userId: anotherUserId,
            })
            const thirdGenerationNoteUnauthorized = await createNote({
                parentFolderId: secondGenerationFolderUnauthorized._id,
                userId: anotherUserId,
            })

            await unclaimFolderAndDescendants(userId, rootFolder)

            const expectedUserIdItems = [
                rootFolder,
                secondGenerationFolder,
                secondGenerationNote,
                thirdGenerationFolder,
                thirdGenerationNote,
            ]
            await Promise.all(
                expectedUserIdItems.map((item) =>
                    checkUpdatedItem(item, (item) =>
                        expect(item?.userId).toBe(null)
                    )
                )
            )

            const expectedAnotherUserIdItems = [
                secondGenerationFolderUnauthorized,
                secondGenerationNoteUnauthorized,
                thirdGenerationFolderUnauthorized,
                thirdGenerationNoteUnauthorized,
            ]
            await Promise.all(
                expectedAnotherUserIdItems.map((item) =>
                    checkUpdatedItem(item, (item) =>
                        expect(item?.userId).toBe(anotherUserId)
                    )
                )
            )
        })
    })
})
