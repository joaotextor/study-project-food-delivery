const ProductsModels = require('../modules/products')

const get = async (req, res) => {
    const { id } = req.params

    const products = await ProductsModels.find(id ? { _id: id } : null)

    res.send(products)
}


module.exports = {
    get,
}