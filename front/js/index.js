import { API_URL } from './utils.js'
import { removeCSSClass, addCSSClass } from './common.js'

const Orders = {
    init: function() {
        this.cacheElements()
        // this.bindEvents()
    },

    cacheElements: function() {
        this.$welcome = document.getElementById('bem-vindo')
        this.$orderWindow = document.getElementById('order-window')
        this.$orderList = document.getElementById('order-table')
    },

    getByCuid: async function(cuid) {
        return await fetch(`${API_URL}/orders/cuid/${cuid}`)
            .then(response => { return response.json()})        
    },

    list: async function(cuid) {
        const orderList = await this.getByCuid(cuid)
        
        console.log(orderList)

        orderList.forEach(order => {

            let orderProducts = ''
            order.products.forEach(product => {
                orderProducts += `<li>${product}</li>`
            })

            this.$orderList.innerHTML += `
            <tr>
                <th>Pedido em</th>
                <th>Situação</th>
                <th>Ação</th>
            </tr>
            <tr>
                <td>${new Date(order.creationDate).toLocaleDateString('en-GB')}</td>
                <td>${order.status}</td>
                <td rowspan="3"><a href="#" data-id="${order._id}">Cancelar</a></td>
            </tr>
            <tr>
                <th colspan="2">Produtos</th>
            </tr>
            <tr>
                <td colspan="2">
                    <ul>
                        ${orderProducts}
                    </ul>
                </td>
            </tr>
            <tr></tr>
            `
        })
        
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
        this.$btnSubmit = document.querySelector('.btn-submit')

        
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
        const loggedCustomer = await fetch(`${API_URL}/customers`)
            .then(response => {
                return response.json()
                    .then(data => {
                        return data.filter(customer => customer.email === email || customer.phone == phone)
                })
            })

            !loggedCustomer.length ? exist = false : exist = true

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

            Orders.$welcome.innerText = `Bem vindo, ${customer.loggedCustomer[0].name}`

            addCSSClass(this.$loginWindow, 'hidden')
            removeCSSClass(Orders.$orderWindow, 'hidden')

            Orders.list(customer.loggedCustomer[0]._id)

        }

    }
}

Customer.init()
Orders.init()