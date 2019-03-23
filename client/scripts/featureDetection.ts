type lastIndexOfExists = () => boolean
type sliceExists = () => boolean
type setAttributeExists = () => boolean
type querySelectorExists = () => boolean
type getElementsByClassNameExsts = () => boolean

function lastIndexOfExists() {
    return 'lastIndexOf' in String.prototype
        && typeof String.prototype.lastIndexOf === 'function'
}

function sliceExists() {
    return 'slice' in String.prototype
        && typeof String.prototype.slice === 'function'
}

function setAttributeExists() {
    return 'setAttribute' in document.body
        && typeof (document as Document).body.setAttribute === 'function'
}

function querySelectorExists() {
    return 'querySelector' in document
        && typeof document.querySelector === 'function'
}

function getElementsByClassNameExists() {
    return 'getElementsByClassName' in document
        && typeof document.getElementsByClassName === 'function'
}
