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
        modal.style.display = "block"
    }

    close.onclick = () => {
        modal.style.display = "none"
    }

    window.onclick = (event) => {
        event.target == modal ? modal.style.display = "none" : null
    }

}

export { removeCSSClass, addCSSClass, bindModal }