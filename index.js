import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

const logRequest = (req, res, next) => {
    console.log(`Request: ${req.method} for ${req.path} on ${new Date()}`)
    next()
}

// 1. What else should we gitignore? .env
// 2. What about comments.json? Include it in the photos.json
// 3. How are we supposed to use the public/images/ http://localhost8080/public/images/...

app.use(logRequest)

const { PORT, CORS_ORIGIN } = process.env
console.log(PORT)

app.use(express.json())

app.use(cors({ origin: CORS_ORIGIN }))

app.get('/photos', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
    console.log("Press CTRL + C to stop server")
})