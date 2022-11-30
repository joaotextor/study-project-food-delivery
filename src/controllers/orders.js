const OrdersModels = require('../modules/orders')

const get = async (req, res) => {
    const { id } = req.params

    const orders = await OrdersModels.find(id ? { _id: id } : null)

    res.send(orders)
}

const post = async (req, res) => {
    const {
        customerID,
        products,
        creationDate,
        status
    } = req.body

    const orders = new OrdersModels({
        customerID,
        products,
        creationDate,
        status
    })

    orders.save()

    res.send({
        message: 'success'
    })

}

const remove = async (req, res) => {
    const { id } = req.params

    const remove = await OrdersModels.deleteOne({ _id: id })

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