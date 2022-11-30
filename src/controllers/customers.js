const CustomersModels = require('../modules/customers')

const get = async (req, res) => {
    const { id } = req.params
    const customers = await CustomersModels.find(id ? { _id: id } : null)

    res.send(customers)
}

const post = async (req, res) => {
    const {
        name,
        email,
        phone,
        address
    } = req.body

    const customers = new CustomersModels({
        name,
        email,
        phone,
        address
    })

    customers.save()

    res.send({
        message: 'success'
    })
}

const remove = async (req, res) => {
    const { id } = req.params

    const remove = await CustomersModels.deleteOne({ _id: id})

    const message = remove.deletedCount === 1 ? 'success' : 'error'

    res.send({
        message
    })
}

module.exports = {
    get,
    post,
    remove
}