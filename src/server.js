const cors = require('cors')
const express = require('express')

const db = require('./database/db')
const routes = require('./routes/routes')

const app = express()

db.connect()

const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5501',
]

//enable cors
app.use(cors({
    origin: (origin, callback) => {
        let allowed = true

        !origin ? allowed = true : null

        !allowedOrigins.includes(origin) ? allowed = false : null

        callback(null, allowed)
    }
}))

//enable server to receive json data
app.use(express.json())

app.use('/', routes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))