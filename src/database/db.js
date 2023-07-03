const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
    const mongoDbUri = process.env.MONGODB_URI
    console.log(mongoDbUri)
    mongoose.connect(process.env.MONGODB_URI)

    const db = mongoose.connection

    db.once('open', () => {
        console.log('Connected to database!')
    })

    db.on('error', console.error.bind(console, 'connection error: '))
}

module.exports = {
    connect
}