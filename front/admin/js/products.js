import { API_URL } from './utils.js'
import { removeCSSClass, addCSSClass, bindModal } from './common.js'

const Products = {
    products: [],

    init: function() {
        this.cacheElements()
        this.bindEvents()
        this.get()
    },

    cacheElements: function() {
        this.$productInfo = document.getElementById('product-info')
        this.$addProductsModal = bindModal("add-product-modal","btn-add-product-modal", "btn-close")
        this.$btnAddProduct = document.getElementById('btn-add-product')
        this.$insertForm = document.getElementById('form-insert-product')
        this.$edtName = document.getElementById('edt-name')
        this.$edtPrice = document.getElementById('edt-price')
    },

    bindEvents: function() {
        const self = this
        this.$btnAddProduct.onclick = this.Events.btnAddProduct_click.bind(self)
    },

    get: async function() {
        this.products = await fetch(`${API_URL}/products`)
            .then(response => { return response.json() })
        this.list()
    },

    remove: async function(id) {
        await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        })
        this.get()
    },

    bindBtnRemoveOnClick: function() {
        this.$products = document.querySelectorAll('.btn-remove-product')
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
        let productsHtml = `
        <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th></th>
        </tr>
        `
        this.products.slice().reverse().forEach(product => {
            productsHtml += `
            <tr height="40px">
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <a href="#" data-id="${product._id}" class="btn-remove-product">    
                        <img src="./images/delete-icon.svg" alt="delete">
                    </a>
                </td>
            </tr>
            `  
        })
        this.$productInfo.innerHTML = productsHtml
        this.bindBtnRemoveOnClick()
    },

    Events: {
        btnAddProduct_click: function() {
            isNaN(this.$edtPrice.value) ? alert(`Price must contain only numbers.`) : Products.new()
        }
    }
}

Products.init()