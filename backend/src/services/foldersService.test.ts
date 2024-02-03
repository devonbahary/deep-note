import { mongoose } from '../mongoose'
import { DEFAULT_NAME, FolderType } from '../models/Folder'
import { NoteType } from '../models/Note'
import {
    createFolder,
    getFolderWithChildItems,
    updateFolder,
} from './foldersService'
import { createNote } from './notesService'

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

        it('a folder with no _folderId should default to being named `root`', async () => {
            const folder = await createFolder()
            expect(folder.name).toBe('root')
        })

        it(`a folder with _folderId should default to being named '${DEFAULT_NAME}'`, async () => {
            const folder = await createFolder(parentFolderId)
            expect(folder.name).toBe(DEFAULT_NAME)
        })
    })

    describe('getFolderWithChildItems', () => {
        let folderId: string
        let childFolder: FolderType
        let childNote: NoteType

        beforeAll(async () => {
            const folder = await createFolder()
            folderId = folder._id

            childFolder = await createFolder(folderId)
            childNote = await createNote(folderId)
        })

        it('should retrieve the folder with all child items', async () => {
            const [folder] = await getFolderWithChildItems(folderId)

            expect(folder.folders).toContainEqual(childFolder.toJSON())
            expect(folder.notes).toContainEqual(childNote.toJSON())
        })
    })

    describe('updateFolder', () => {
        let folder: FolderType

        beforeAll(async () => {
            folder = await createFolder()
        })

        it('should update and trim the name field, returning the updated document', async () => {
            const name = 'name  '

            const updatedFolder = await updateFolder(folder._id, name)

            expect(updatedFolder?.name).toBe(name.trim())
        })
    })
})
