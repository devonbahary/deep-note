import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB_NAME } = process.env

;(async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@deepnotedevcluster.ncspqj5.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`
        )
        console.log('Connected to mongodb successfully')
    } catch (err) {
        console.error(err)
    }
})()

export { mongoose }
