if (canMakeUseOfJavaScript()) {
    removeMetaRefresh()

    var locationPath = window.location.pathname
    var socket = io()
    var urlWithoutScore = locationPath.replace('/score', '')
    var roomId = urlWithoutScore.slice(urlWithoutScore.lastIndexOf('/') + 1)
    socket.on('score added', onScoreAdded)
}

function onScoreAdded(data) {
    // This will cause memory leaks if used on large scale, for now it's not a problem.
    if (data.roomId !== roomId) {
        return
    }

    var graphBars = getHtmlElementsByClass('ScoreListOption__graph-bar')
    for (var i = 0; i < graphBars.length; i++) {
        if (!graphBars[i]
            || !graphBars[i].hasAttribute('data-answer-id')
            || graphBars[i].getAttribute('data-answer-id') !== data.answerId
        ) {
            continue
        }

        updateGraph(graphBars[i])
    }
}

function removeMetaRefresh() {
    var head = document.getElementsByTagName('head')[0]
    var metaTags = document.getElementsByTagName('meta')

    for (var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].httpEquiv) {
            head.removeChild(metaTags[i])
        }
    }
}

function updateGraph(graphBar) {
    var currentHeight = Number(graphBar.style.height.replace('px', ''))
    graphBar.style.height = currentHeight + 10 + 'px'
    var parent = graphBar.parentElement
    var amountElement = parent.children[2]

    if (amountElement) {
        setTextContentOfElement(amountElement, Number(amountElement.innerText) + 1)
    }
}