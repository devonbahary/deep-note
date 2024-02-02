module.exports = {
    async up(db) {
        await db.createCollection('notes')
        await db.collection('notes').createIndex({ _folderId: 1 })
    },

    async down(db) {
        await db.dropCollection('notes')
    },
}
