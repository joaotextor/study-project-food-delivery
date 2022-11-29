const router = require('express').Router()

const CustomersController = require('../controllers/customers')
const ProductsController = require('../controllers/products')
// const OrdersControlller = require('../controllers/orders')

//Customers
router.get('/customers/:id?', CustomersController.get)
router.post('/customers', CustomersController.post)
router.delete('/customers/:id', CustomersController.remove)

//Products
router.get('/products/:id?', ProductsController.get)

module.exports = router