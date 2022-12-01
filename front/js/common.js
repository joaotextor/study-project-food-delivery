function removeCSSClass(element, className) {
    element.classList.remove(className)
}

function addCSSClass(element, className) {
    element.classList.add(className)
}

export { removeCSSClass, addCSSClass }