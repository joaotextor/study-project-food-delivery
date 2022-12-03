import { Orders, Products, Customer } from "./index.js"

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
        modal.classList.add('d-block')
        modal.classList.remove('hidden')
    }

    close.onclick = () => {
        modal.classList.add('hidden')
        modal.classList.remove('d-block')
    }

    window.onclick = (event) => {
        event.target == modal ? modal.style.display = "none" : null
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



// function modalExecute(modalName) { 
//         switch (modalName.id) {
//             case 'order-modal':
//                 console.log(`${modalName.id} loaded`)
//         }
// }

export { removeCSSClass, addCSSClass, bindModal }