import { API_URL } from './utils.js'
import { removeCSSClass, addCSSClass, bindModal } from './common.js'

const Main = {
    loggedCustomer: []
}

const Orders = {
    init: function() {
        this.cacheElements()
        this.bindEvents()
    },

    cacheElements: function() {
        this.$welcome = document.getElementById('welcome')
        this.$orderWindow = document.getElementById('order-window')
        this.$orderList = document.querySelector('.order-items')
        this.$btnReload = document.getElementById('btn-reload')
        this.$btnConfirmOrder = document.querySelector('.btn-confirm-order')
        this.$productsWrapper = document.querySelector('#products-wrapper')
        this.$modal = bindModal("order-modal","btn-order-insert", "btn-close")
    },

    bindEvents: function() {
        const self = this
        this.$btnReload.onclick = this.Events.btnReload_click.bind(self)
        this.$btnConfirmOrder.onclick = this.Events.btnRegister_click.bind(self)
    },

    getByCuid: async function(cuid) {
        return await fetch(`${API_URL}/orders/cuid/${cuid}`)
            .then(response => { return response.json()})        
    },

    populateProductWrapper: async function() {
        await Products.list()
        let productsHtml = ''

        Products.products.forEach(product => {
            const price = product.price.toString().split('.')
            let cents = ''

            if (price[1]) { 
                price[1].length === 1 ? cents = price[1].toString() + '0' : cents = price[1]
            } else {
                cents = '00'
            }

            productsHtml += `
            <div class="product-card flex-column" data-id="${product._id}" data-pressed="false">
                    <p class="product-name">${product.name}</p>
                    <p class="product-price"><span>R$</span>${price[0]},<span>${cents}</span></p>
                </div>
            `  
        })
        
        this.$productsWrapper.innerHTML = productsHtml
    },

    bindProductCardPressed: function() {
        this.$btnProductCard = document.querySelectorAll('.product-card')
        this.$btnProductCard.forEach(productCard => {
            productCard.onclick = this.Events.productCard_onclick
        })
    },

    list: async function(cuid) {
        const orderList = await this.getByCuid(cuid)


        orderList.slice().reverse().forEach(async order => {
            let productsHtml = ''


            //tried 'order.products.forEach' and 'order.produts.map' but didn't work because it was executing the rest of the code while "fetch" was being executed. Therefore, productsHtml was returning empty.
            for (let i = 0; i < order.products.length; i++) {
                await fetch(`${API_URL}/products/${order.products[i]}`)
                    .then(response => {return response.json()})
                    .then(product => {productsHtml += `<li>${product[0].name}</li>`})
            }

            Orders.$orderList.insertAdjacentHTML('beforeend',
            `
            <table>
            <tr>
                <th>Pedido em</th>
                <th>Situação</th>
                <th>Ação</th>
            </tr>
            <tr>
                <td>${new Date(order.creationDate).toLocaleDateString('en-GB')}</td>
                <td>${order.status}</td>
                <td rowspan="3"><button id="btn-${order._id}" class="btn-remove" data-id="${order._id}">Cancelar</button></td>
            </tr>
            <tr>
                <th colspan="2">Produtos</th>
            </tr>
            <tr>
                <td colspan="2">
                    <ul>
                        ${productsHtml}
                    </ul>
                </td>
            </tr>
            </table>
            `)

            let $btnRemove = ''
            $btnRemove = document.getElementById(`btn-${order._id}`)
            
            $btnRemove.onclick = () => Orders.Events.btnRemove_click(order._id)
        })

    },

    new: async function(id) {
            const customerID = Main.loggedCustomer[0]._id
            let products = []
            const creationDate = new Date()
            this.$btnProductCard.forEach(productCard => {
                if (productCard.dataset.pressed == 'true') {
                    products.push(productCard.dataset.id)
                }
                
            })

            await fetch(`${API_URL}/orders`, {
                method: 'POST',	
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerID,
                    products,
                    creationDate,
                    status: 'Pendente'
                })
            }).then(response => {
                response.json().then(data => {
                    if (data.message === 'success') {
                        this.$modal.classList.add('hidden')
                        this.$modal.classList.remove('d-block')
                        Orders.$orderList.innerHTML = ''
                        Orders.list(Main.loggedCustomer[0]._id)

                    }
                })
            })

    },

    remove: async function(id) {
        await fetch(`${API_URL}/orders/${id}`, {
            method: 'DELETE'
        })
    },

    Events: {
        btnReload_click: function() {
            Orders.$orderList.innerHTML = ''
            Orders.list(Main.loggedCustomer[0]._id)
        },

        productCard_onclick: function() {
            if (this.dataset.pressed == 'true') {
                this.dataset.pressed = false
            } else {
                this.dataset.pressed = true
            }
        },

        btnRegister_click: function() {
            this.new()
        },

        btnRemove_click: async function(id) {
            await Orders.remove(id)
            Orders.$orderList.innerHTML = ''
            Orders.list(Main.loggedCustomer[0]._id)
        },
    }
}

const Customer = {
        init: function() {
        this.cacheElements()
        this.bindEvents()
    },

    cacheElements: function() {
        this.$loginWindow = document.getElementById('login-window')
        this.$form = document.querySelector('.form-submit')
        this.$name = document.getElementById('name')
        this.$email = document.getElementById('email')
        this.$phone = document.getElementById('phone')
        this.$address = document.getElementById('address')
        this.$btnSubmit = document.querySelector('#btn-submit')

        
    },

    bindEvents: function() {
        const self = this

        this.$btnSubmit.onclick = this.Events.btnSubmit_submit.bind(self)

    },

    addCustomer: async function(name, email, phone, address) {
        let customer = await this.customer(email, phone)
        let message
        if (customer.exist) { 
            message = 'Erro: já há um cadastro com este e-mail ou telefone!'
            return message
        }

        await fetch(`${API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                address
                })
            }).then(response => {
                response.json().then(data => {
                    if (data.message === 'success') {
                        
                    }
                })
            })

            message = 'success'
            return message
    },

    customer: async function(email, phone) {
        let exist = false
        let loggedCustomer = await fetch(`${API_URL}/customers`)
            .then(response => {
                return response.json()
                    .then(data => {
                        return data.filter(customer => customer.email === email || customer.phone == phone)
                })
            })

            !loggedCustomer.length ? exist = false : exist = true

            Main.loggedCustomer = loggedCustomer

            return { exist, loggedCustomer }
    },

    Events: {
        
        btnSubmit_submit: async function(e) {
            e.preventDefault()

            let error = 0
            
            removeCSSClass(this.$name.parentElement, 'error')
            removeCSSClass(this.$name, 'error')
            removeCSSClass(this.$email.parentElement, 'error')
            removeCSSClass(this.$email, 'error')

            if (!this.$name.value) {
                this.$name.parentElement.classList.add('error')
                addCSSClass(this.$name, 'error')
                error = 1
            }

            if (!this.$email.value) {
                addCSSClass(this.$email.parentElement, 'error')
                addCSSClass(this.$email, 'error')
                error = 1
            }

            if (error != 0) {
                alert('Por favor, corrija os campos em destaque.') 
                return
            }
            
            await this.addCustomer(this.$name.value, this.$email.value, this.$phone.value, this.$address.value)

            const customer = await this.customer(this.$email.value, this.$phone.value)

            Orders.$welcome.innerText = `Bem vindo, ${Main.loggedCustomer[0].name}`

            addCSSClass(this.$loginWindow, 'hidden')
            removeCSSClass(Orders.$orderWindow, 'hidden')

            Orders.list(customer.loggedCustomer[0]._id)
        }

    }
}

const Products = {
    products: [],

    init: async function() {
        this.cacheElements()
    },

    cacheElements: function() {

    },

    list: async function() {
        this.products = await fetch(`${API_URL}/products`)
        .then(response => { return response.json()})
    }
}

Customer.init()
Orders.init()
Products.init()

export { Orders, Products, Customer }