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
        && typeof document.body.setAttribute === 'function'
}

function hasAttributeExists() {
    return 'hasAttribute' in document.body
        && typeof document.body.hasAttribute === 'function'
}

function classNameExists() {
    return 'className' in document.body
}

function querySelectorAllExists() {
    return 'querySelectorAll' in document
        && typeof document.body.querySelectorAll === 'function'
}

function getElementsByClassNameExists() {
    return 'getElementsByClassName' in document
        && typeof document.getElementsByClassName === 'function'
}

function appendChildExists() {
    return 'appendChild' in document.body
        && typeof document.body.appendChild === 'function'
}

function getElementsByTagNameExists() {
    return 'getElementsByTagName' in document.body
        && typeof document.body.getElementsByTagName === 'function'
}

function getAttributeExists() {
    return 'getAttribute' in document.body
        && typeof document.body.getAttribute === 'function'
}

function locationPathExists() {
    return 'pathname' in window.location
}

function getElementsByClassNameAlternative(className) {
    var matches = []
    var tags = document.getElementsByTagName("*")

    for (var i = 0; i < tags.length; i++) {
        var classNames = tags[i].className.split(' ')

        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                matches.push(tags[i])
            }
        }
    }

    return matches
}

function getHtmlElementsByClass(className) {
    if (querySelectorAllExists()) {
        return document.querySelectorAll('.' + className)
    } else if (getElementsByClassNameExists()) {
        return document.getElementsByClassName(className)
    } else {
        return getElementsByClassNameAlternative(className)
    }
}

function setTextContentOfElement(element, content) {
    if ('textContent' in element) {
        element.textContent = content
    } else if ('innerText' in element) {
        element.innerText = content
    }
}

function canMakeUseOfJavaScript() {
    return lastIndexOfExists()
        && getElementsByTagNameExists()
        && getAttributeExists()
        && hasAttributeExists()
        && locationPathExists()
        && sliceExists()
        && classNameExists()
}