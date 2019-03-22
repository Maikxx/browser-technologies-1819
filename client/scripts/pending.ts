// tslint:disable:no-var-keyword
// tslint:disable:prefer-template
// tslint:disable:prefer-const
var answerBrickElement = getHtmlElementByClass('AnswerBrick')
var lastIndexOfExists = 'lastIndexOf' in String.prototype && typeof String.prototype.lastIndexOf === 'function'
var sliceExists = 'slice' in String.prototype && typeof String.prototype.slice === 'function'
var setAttributeExists = 'setAttribute' in document.body && typeof (document as Document).body.setAttribute === 'function'

if (answerBrickElement && lastIndexOfExists && sliceExists && setAttributeExists) {
    var locationPath = window.location.pathname
    var lastIndexOfSlash = locationPath.lastIndexOf('/')
    var answerId = Number(locationPath.slice(lastIndexOfSlash + 1))

    if (answerId === 0) {
        answerBrickElement.setAttribute('style', 'background-color: #FF5722; color: #212121;')
    } else if (answerId === 1) {
        answerBrickElement.setAttribute('style', 'background-color: #303F9F;')
    } else if (answerId === 2) {
        answerBrickElement.setAttribute('style', 'background-color: #009688;')
    } else if (answerId === 3) {
        answerBrickElement.setAttribute('style', 'background-color: #795548;')
    }
}

function getHtmlElementByClass(className: string) {
    var querySelectorExists = 'querySelector' in document && typeof document.querySelector === 'function'
    var getElementsByClassNameExists = 'getElementsByClassName' in document && typeof document.getElementsByClassName === 'function'

    if (querySelectorExists) {
        return document.querySelector('.' + className)
    } else if (getElementsByClassNameExists) {
        return (document as Document).getElementsByClassName(className)[0]
    } else {
        return null
    }
}
