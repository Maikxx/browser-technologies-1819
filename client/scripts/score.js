if (canMakeUseOfJavaScript()) {
    var locationPath = window.location.pathname

    if (io && typeof io === 'function') {
        var socket = io()
        var urlWithoutScore = locationPath.replace('/score', '')
        var roomId = urlWithoutScore.slice(urlWithoutScore.lastIndexOf('/') + 1)
        socket.on('score added', onScoreAdded)
    } else {
        setTimeout(() => {
            window.location.reload()
        }, 5000)
    }
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

function updateGraph(graphBar) {
    var currentHeight = Number(graphBar.style.height.replace('px', ''))
    graphBar.className = graphBar.className + ' incrementing'
    graphBar.style.height = currentHeight + 10 + 'px'

    setTimeout(() => {
        graphBar.className = 'ScoreListOption__graph-bar'
    }, 500)

    var parent = graphBar.parentElement
    var amountElement = parent.children[2]

    if (amountElement) {
        setTextContentOfElement(amountElement, Number(amountElement.innerText) + 1)
    }
}