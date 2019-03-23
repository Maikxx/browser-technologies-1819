var answerBrickElement = getHtmlElementByClass('AnswerBrick')

if (answerBrickElement && lastIndexOfExists() && sliceExists() && setAttributeExists()) {
    var locationPath = window.location && window.location.pathname

    // Pathname is not supported in versions of Firefox below 22.
    if (locationPath) {
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
}
