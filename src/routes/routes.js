const router = require('express').Router()

const CustomersController = require('../controllers/customers')
const ProductsController = require('../controllers/products')
const OrdersController = require('../controllers/orders')

//Customers
router.get('/customers/:id?', CustomersController.get)
router.post('/customers', CustomersController.post)
router.delete('/customers/:id', CustomersController.remove)

//Products
router.get('/products/:id?', ProductsController.get)
router.post('/products', ProductsController.post)
router.delete('/products/:id', ProductsController.remove)

//Orders
router.get('/orders/:id?', OrdersController.get)
router.post('/orders', OrdersController.post)
router.delete('/orders/:id', OrdersController.remove)

module.exports = router