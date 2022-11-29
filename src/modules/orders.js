const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    customerID: String,
    products: [String],
    creationDate: {
        type: Date, 
        default: Date.now()
    },
    status: String,
})

const Model = mongoose.model('orders', schema)

module.exports = Model