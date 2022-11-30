import { API_URL } from './utils.js'


const Customer = {
    init: function() {
        this.cacheElements()
        this.bindEvents()
    },

    cacheElements: function() {
        //form
        this.$loginWindow = document.getElementById('login-window')
        this.$form = document.querySelector('.form-submit')
        this.$name = document.getElementById('name')
        this.$email = document.getElementById('email')
        this.$phone = document.getElementById('phone')
        this.$address = document.getElementById('address')
        this.$btnSubmit = document.querySelector('.btn-submit')

        //order list
        this.$welcome = document.getElementById('bem-vindo')
        this.$orderWindow = document.getElementById('order-window')
        this.$orderList = document.getElementById('order-table')
    },

    bindEvents: function() {
        const self = this

        this.$btnSubmit.onclick = this.Events.btnSubmit_submit.bind(self)

    },

    add: async function(name, email, phone, address) {
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
                const customer = response.json()
                    .then(data => {
                        let customerFiltered = data.filter(customer => customer.email === email || customer.phone == phone)

                        return customerFiltered
                })
                return customer
            })

            !loggedCustomer.length ? exist = false : exist = true

            return { exist, loggedCustomer }
    },

    Events: {
        
        btnSubmit_submit: async function(e) {
            e.preventDefault()

            let error = 0

            if (!this.$name.value) {
                this.$name.parentElement.classList.add('error')
                this.$name.classList.add('error')
                error = 1
            }

            if (!this.$email.value) {
                this.$email.parentElement.classList.add('error')
                this.$email.classList.add('error')
                error = 1
            }

            if (error != 0) {
                alert('Por favor, corrija os campos em destaque.') 
                return
            }

            this.$name.parentElement.classList.remove('error')
            this.$name.classList.remove('error')
            this.$email.parentElement.classList.remove('error')
            this.$email.classList.remove('error')
            
            await this.add(this.$name.value, this.$email.value, this.$phone.value, this.$address.value)

            const customer = await this.customer(this.$email.value, this.$phone.value)

            this.$welcome.innerText = `Bem vindo, ${customer.loggedCustomer[0].name}`
          
            this.$loginWindow.classList.add('hidden')
            this.$orderWindow.classList.remove('hidden')

        }

    }
}

Customer.init()