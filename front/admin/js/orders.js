import { API_URL } from './utils.js'
import { removeCSSClass, addCSSClass, bindModal } from './common.js'

const Orders = {
    orders: [],

    init: function() {
        this.cacheElements()
        this.bindEvents()
        this.get()
    },

    cacheElements: function() {
        this.$orderInfo = document.getElementById('order-info')
        this.$addOrdersModal = bindModal("add-order-modal","btn-add-order-modal", "btn-close")
        this.$btnAddOrder = document.getElementById('btn-add-order')
        this.$insertForm = document.getElementById('form-insert-order')
    },

    bindEvents: function() {
        const self = this
        this.$btnAddOrder.onclick = this.Events.btnAddOrder_click.bind(self)
    },

    get: async function() {
        this.orders = await fetch(`${API_URL}/orders`)
            .then(response => { return response.json() })
        this.list()
    },

    remove: async function(id) {
        await fetch(`${API_URL}/orders/${id}`, {
            method: 'DELETE'
        })
        this.get()
    },

    bindBtnRemoveOnClick: function() {
        this.$products = document.querySelectorAll('.btn-remove-order')
        this.$products.forEach(product => {
            product.onclick = () => this.remove(product.dataset.id)
        })
    },

    new: async function() {
        await fetch(`${API_URL}/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.$edtName.value,
                price: this.$edtPrice.value,
            })
        }).then(response => { 
                response.json().then(data => {
                    if (data.message === 'success') {
                        addCSSClass(this.$addProductsModal, 'hidden')
                        removeCSSClass(this.$addProductsModal, 'd-block')
                        this.$insertForm.reset()
                        Products.get()
                    }
                }) 
            })
    },

    list: function() {
        let ordersHtml = `
        <tr>
            <th>Data</th>
            <th>Cliente</th>
            <th>Produtos</th>
            <th>Situação</th>
            <th></th>
        </tr>
        `

        this.orders.slice().reverse().forEach(async order => {
            let productsHtml = ''
            
            
            let customerName = await fetch(`${API_URL}/customers/${order.customerID}`)
                .then(response => { return response.json()})
                .then(customer => { return customer[0].name })
    
            for (let i = 0; i < order.products.length; i++) {
                await fetch(`${API_URL}/products/${order.products[i]}`)
                    .then(response => { return response.json() })
                    .then(product => {
                        productsHtml += `<li>${product[0].name}</li>`
                    })
            }            
            Orders.$orderInfo.insertAdjacentHTML('beforeend',
            `
            <tr height="40px">
                <td>${new Date(order.creationDate).toLocaleDateString('eg-GB')}</td>
                <td>${customerName}</td>
                <td>
                    <ul>
                        ${productsHtml}
                    </ul>
                </td>
                <td>${order.status}</td>
                <td>
                    <a href="#" data-id="${order._id}" class="btn-remove-order">    
                        <img src="./images/delete-icon.svg" alt="delete">
                    </a>
                </td>
                
            </tr>
            `
            )
            
        })
        this.bindBtnRemoveOnClick()
    },

    Events: {
        btnAddOrder_click: function() {
            // Orders.new()
        }
    }
}

Orders.init()