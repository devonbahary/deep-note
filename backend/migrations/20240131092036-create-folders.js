module.exports = {
    async up(db) {
        await db.createCollection('folders')
        await db.collection('folders').createIndex({ _folderId: 1 })
    },

    async down(db) {
        await db.dropCollection('folders')
    },
}
