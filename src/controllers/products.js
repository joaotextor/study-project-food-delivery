const ProductsModels = require('../modules/products')

const get = async (req, res) => {
    const { id } = req.params

    const products = await ProductsModels.find(id ? { _id: id } : null)

    res.send(products)
}

const post = async (req, res) => {
    const {
        name,
        price
    } = req.body

    const products = new ProductsModels({
        name,
        price
    })

    products.save()

    res.send({
        message: 'success'
    })
}

const remove = async (req, res) => {
    const { id } = req.params

    const remove = await ProductsModels.deleteOne({ _id: id})

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