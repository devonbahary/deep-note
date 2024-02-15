import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const {
    MONGODB_CONNECTION_STRING,
    MONGODB_DB_NAME,
    MONGODB_TEST_DB_NAME,
    NODE_ENV,
} = process.env

const dbName = NODE_ENV === 'test' ? MONGODB_TEST_DB_NAME : MONGODB_DB_NAME

;(async () => {
    try {
        await mongoose.connect(
            `${MONGODB_CONNECTION_STRING}/${dbName}?retryWrites=true&w=majority`
        )
        console.log('Connected to mongodb successfully')
    } catch (err) {
        console.error(err)
    }
})()

export { mongoose }
