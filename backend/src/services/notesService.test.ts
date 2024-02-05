import { mongoose } from '../mongoose'
import { DEFAULT_NAME } from '../models/Note'
import { createFolder } from './foldersService'
import { createNote, updateNote } from './notesService'

describe('notesService', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })

    let parentFolderId: string

    beforeAll(async () => {
        const folder = await createFolder()
        parentFolderId = folder._id
    })

    describe('createNote', () => {
        it('should fail without a _parentFolderId', async () => {
            await expect(createNote('fake_folder_id')).rejects.toThrow()
        })

        it('should succeed a _parentFolderId, with a default name', async () => {
            const note = await createNote(parentFolderId)

            expect(note.toJSON()).toMatchObject({
                name: DEFAULT_NAME,
                _parentFolderId: parentFolderId,
            })
        })
    })

    describe('updateNote', () => {
        let noteId: string

        beforeAll(async () => {
            const note = await createNote(parentFolderId)
            noteId = note._id
        })

        it('should update and trim the name field without updating the content field, returning the updated document', async () => {
            const content = 'hello world'
            const noteBeforeNameUpdate = await updateNote(noteId, { content })

            const name = 'name  '
            const updatedNote = await updateNote(noteId, { name })

            expect(updatedNote?.name).toBe(name.trim())
            expect(updatedNote?.content).toBe(noteBeforeNameUpdate?.content)
        })

        it('should update the content field without updating the name field, returning the updated document', async () => {
            const name = 'name'
            const noteBeforeContentUpdate = await updateNote(noteId, { name })

            const content = JSON.stringify([{}])
            const updatedNote = await updateNote(noteId, { content })

            expect(updatedNote?.content).toBe(content)
            expect(updatedNote?.name).toBe(noteBeforeContentUpdate?.name)
        })

        it('should update the _parentFolderId field, returning the updated document', async () => {
            const newParentFolder = await createFolder()

            const updatedNote = await updateNote(noteId, {
                parentFolderId: newParentFolder._id,
            })

            expect(updatedNote?._parentFolderId?.toString()).toBe(
                newParentFolder._id.toString()
            )
        })
    })
})
