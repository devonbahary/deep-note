module.exports = {
    async up(db) {
        await db.createCollection('folders')
        await db.collection('folders').createIndex({ _parentFolderId: 1 })
    },

    async down(db) {
        await db.dropCollection('folders')
    },
}
