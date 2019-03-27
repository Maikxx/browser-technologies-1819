function checkIfFeatureExists(feature, where, type) {
    return feature in where
        && type ?
            typeof where[feature] === type
            : true
}

function getHtmlElementsByClass(className) {
    if (checkIfFeatureExists('querySelectorAll', document.body, 'function')) {
        return document.querySelectorAll('.' + className)
    } else if (checkIfFeatureExists('getElementsByClassName', document.body, 'function')) {
        return document.getElementsByClassName(className)
    } else {
        return getElementsByClassNamePolyfill(className)
    }
}

function setTextContentOfElement(element, content) {
    if ('textContent' in element) {
        element.textContent = content
    } else if ('innerText' in element) {
        element.innerText = content
    } else {
        throw new Error('Cannot set text content of element...')
    }
}

function attachEventToElement(element, event, callback) {
    if ('addEventListener' in element) {
        element.addEventListener(event, callback)
    } else if ('attachEvent' in element) {
        element.attachEvent(event, callback)
    } else {
        throw new Error('Cannot set event listener on element...')
    }
}

function getElementsByClassNamePolyfill(className) {
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

function canMakeUseOfJavaScript() {
    return checkIfFeatureExists('lastIndexOf', String.prototype, 'function')
        && checkIfFeatureExists('slice', String.prototype, 'function')
        && checkIfFeatureExists('getElementsByTagName', document.body, 'function')
        && checkIfFeatureExists('setAttribute', document.body, 'function')
        && checkIfFeatureExists('hasAttribute', document.body, 'function')
        && checkIfFeatureExists('getAttribute', document.body, 'function')
        && checkIfFeatureExists('pathname', window.location, 'function')
        && checkIfFeatureExists('className', document.body, 'function')
}