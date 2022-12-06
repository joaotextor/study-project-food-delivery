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
        this.$addCustomerModal = bindModal("add-customer-modal","btn-add-customer", "btn-close")
    },

    bindEvents: function() {
        const self = this
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
        btnOpenModal_click: function() {

        }
    }
}

Customers.init()