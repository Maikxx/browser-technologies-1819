function lastIndexOfExists() {
    return 'lastIndexOf' in String.prototype
        && typeof String.prototype.lastIndexOf === 'function';
}
function sliceExists() {
    return 'slice' in String.prototype
        && typeof String.prototype.slice === 'function';
}
function setAttributeExists() {
    return 'setAttribute' in document.body
        && typeof document.body.setAttribute === 'function';
}
function querySelectorExists() {
    return 'querySelector' in document
        && typeof document.querySelector === 'function';
}
function getElementsByClassNameExists() {
    return 'getElementsByClassName' in document
        && typeof document.getElementsByClassName === 'function';
}
function appendChildExists() {
    return 'appendChild' in document.body
        && typeof document.body.appendChild === 'function';
}
function getElementsByTagNameExists() {
    return 'getElementsByTagName' in document.body
        && typeof document.body.getElementsByTagName === 'function';
}
