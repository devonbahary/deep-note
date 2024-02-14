module.exports = {
    async up(db) {
        await db.collection('folders').createIndex({ userId: 1 })
        await db.collection('notes').createIndex({ userId: 1 })
    },

    async down(db) {
        await db.collection('folders').dropIndex('userId_1')
        await db.collection('notes').dropIndex('userId_1')
    },
}
