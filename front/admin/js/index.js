import { API_URL } from './utils.js'

const Main = {
    init: function() {
        this.cacheElements()
        this.bindEvents()
    },

    cacheElements: function() {
        //* LOGIN WINDOW
        this.$loginWindow = document.getElementById('login-window')
        this.$username = document.getElementById('username')
        this.$password = document.getElementById('password')
        this.$btnLogin = document.getElementById('btn-login')
        this.$lblErrorMsg = document.getElementById('lbl-error')

        //* ADMIN PANEL
        this.$indexWindow = document.getElementById('index-window')
    },

    bindEvents: function() {
        const self = this
        this.$btnLogin.onclick = this.Events.btnLogin_login.bind(self);
    },

    Events: {
        btnLogin_login: function(e) {
            e.preventDefault()
            if (this.$username.value === 'admin' && this.$password.value === 'admin') {
                this.$loginWindow.classList.add('hidden')
                this.$indexWindow.classList.remove('hidden')
            } else {
                this.$lblErrorMsg.classList.remove('hidden')
            }
        }
    }
}

Main.init()