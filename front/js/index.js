import { API_URL } from './utils.js'


const Customer = {
    init: function() {
        this.cacheElements()
        this.bindEvents()
    },

    cacheElements: function() {
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

            await this.add(this.$name.value, this.$email.value, this.$phone.value, this.$address.value)

            const customer = await this.customer(this.$email.value, this.$phone.value)

            



            // let customerExist = await this.customerExists(this.$email.value, this.$phone.value)

            // const {name, phone, address} = customerExist.loggedCustomer[0]

            // console.log(name)
        

        }

    }
}

Customer.init()