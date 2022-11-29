const router = require('express').Router()

// const ProductsController = require('../controllers/products')
// const OrdersControlller = require('../controllers/orders')
const CustomersController = require('../controllers/customers')

router.get('/customers/:id?', CustomersController.get)
router.post('/customers', CustomersController.post)
router.delete('/customers/:id', CustomersController.remove)

module.exports = router