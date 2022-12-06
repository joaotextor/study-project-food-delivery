import { Orders } from "./index.js"

function removeCSSClass(element, className) {
    element.classList.remove(className)
}

function addCSSClass(element, className) {
    element.classList.add(className)
}

function bindModal(name, btnOpen, btnClose) {
    const modal = document.getElementById(name)
    const open = document.getElementById(btnOpen)
    const close = document.getElementById(btnClose)

    open.onclick = () => {
        addCSSClass(modal, 'd-block')
        removeCSSClass(modal, 'hidden')
    }

    close.onclick = () => {
        addCSSClass(modal, 'hidden')
        removeCSSClass(modal, 'd-block')
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            addCSSClass(modal, 'hidden')
            removeCSSClass(modal, 'd-block')
        }
    }

    const func = modalExecute[`${modal.id}`]
    try { func() } catch { }

    return modal
}

const modalExecute = {
    "order-modal": async function() {
        try { 
            await Orders.populateProductWrapper()
            Orders.bindProductCardPressed()

        } catch (e) {
             console.log(e) 
        }
    },
}

export { removeCSSClass, addCSSClass, bindModal }