import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import folders from './routes/folders'
import notes from './routes/notes'

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use('/folders', folders)
app.use('/notes', notes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
