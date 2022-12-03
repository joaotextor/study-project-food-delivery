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

    modalExecute(modal)

    return modal
}

function modalExecute(modalName) { 
        switch (modalName.id) {
            case 'order-modal':
                console.log(`${modalName.id} loaded`)
        }
}

export { removeCSSClass, addCSSClass, bindModal }