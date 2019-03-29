var answerBrickElement = getHtmlElementsByClass('AnswerBrick')[0]

if (answerBrickElement && canMakeUseOfJavaScript()) {
    var locationPath = window.location && window.location.pathname
    if (locationPath) {
        var lastIndexOfSlash = locationPath.lastIndexOf('/')
        var answerId = Number(locationPath.slice(lastIndexOfSlash + 1))

        if (answerId === 0) {
            answerBrickElement.setAttribute('style', 'background-color: #DF3600; color: #212121;')
        } else if (answerId === 1) {
            answerBrickElement.setAttribute('style', 'background-color: #303F9F;')
        } else if (answerId === 2) {
            answerBrickElement.setAttribute('style', 'background-color: #009688;')
        } else if (answerId === 3) {
            answerBrickElement.setAttribute('style', 'background-color: #795548;')
        }
    }
}
