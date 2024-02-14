import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { auth } from 'express-oauth2-jwt-bearer'
import folders from './routes/folders'
import notes from './routes/notes'
import user from './routes/user'

dotenv.config()

const { AUTH_AUDIENCE, AUTH_ISSUER_BASE_URL } = process.env

const app = express()

const checkJwt = auth({
    audience: AUTH_AUDIENCE,
    issuerBaseURL: AUTH_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
    authRequired: false,
})

app.use(bodyParser.json())

const pathToClient = path.join(__dirname, '/../../frontend/dist')
app.use(express.static(pathToClient))

app.use(checkJwt)

app.use('/folders', folders)
app.use('/notes', notes)
app.use('/user', user)

app.get('/*', (req, res) => {
    res.sendFile(path.join(pathToClient, 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
