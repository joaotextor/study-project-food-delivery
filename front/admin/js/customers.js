import { API_URL } from './utils.js'
import { removeCSSClass, addCSSClass, bindModal } from './common.js'

const Customers = {
    customers: [],

    init: function() {
        this.cacheElements()
        this.bindEvents()
        this.get()
    },

    cacheElements: function() {
        this.$customerInfo = document.getElementById('customer-info')
        this.$addCustomerModal = bindModal("add-customer-modal","btn-add-customer-modal", "btn-close")
        this.$edtName = document.getElementById('edt-name')
        this.$edtAddress = document.getElementById('edt-address')
        this.$edtEmail = document.getElementById('edt-email')
        this.$edtPhone = document.getElementById('edt-phone')
        this.$btnAddCustomer = document.getElementById('btn-add-customer')
        this.$insertForm = document.getElementById('form-insert-customer')
    },

    bindEvents: function() {
        const self = this
        this.$btnAddCustomer.onclick = this.Events.btnAddCustomer_click.bind(self)
    },

    get: async function() {
        this.customers = await fetch(`${API_URL}/customers`)
            .then(response => { return response.json() })
        this.list()
    },

    remove: async function(id) {
        await fetch(`${API_URL}/customers/${id}`, {
            method: 'DELETE'
        })
        this.get()
    },

    bindBtnRemoveOnClick: function() {
        this.$customers = document.querySelectorAll('.btn-remove-customer')
        this.$customers.forEach(customer => {
            customer.onclick = () => this.remove(customer.dataset.id)
        })
    },

    new: async function() {
        await fetch(`${API_URL}/customers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.$edtName.value,
                email: this.$edtEmail.value,
                phone: this.$edtPhone.value,
                address: this.$edtAddress.value
            })
        }).then(response => { 
                response.json().then(data => {
                    if (data.message === 'success') {
                        addCSSClass(this.$addCustomerModal, 'hidden')
                        removeCSSClass(this.$addCustomerModal, 'd-block')
                        this.$insertForm.reset()
                        Customers.get()
                    }
                }) 
            })
    },

    list: function() {
        let customersHtml = `
        <tr>
            <th>Cliente</th>
            <th>Endereço</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th></th>
        </tr>
        `
        this.customers.slice().reverse().forEach(customer => {
            customersHtml += `
            <tr height="40px">
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <a href="#" data-id="${customer._id}" class="btn-remove-customer">    
                        <img src="./images/delete-icon.svg" alt="delete">
                    </a>
                </td>
            </tr>
            `  
        })
        this.$customerInfo.innerHTML = customersHtml
        this.bindBtnRemoveOnClick()
    },

    Events: {
        btnAddCustomer_click: function() {
            Customers.new()
        }
    }
}

Customers.init()