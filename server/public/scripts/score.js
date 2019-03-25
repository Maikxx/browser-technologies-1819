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
    var counters = getHtmlElementsByClass('ScoreListOption__incrementor')
    for (var i = 0; i < graphBars.length; i++) {
        if (!graphBars[i]
            || !graphBars[i].hasAttribute('data-answer-id')
            || graphBars[i].getAttribute('data-answer-id') !== data.answerId
        ) {
            continue
        }

        updateGraph(graphBars[i], counters[i])
    }
}

function updateGraph(graphBar, counter) {
    var currentHeight = Number(graphBar.style.height.replace('px', ''))
    graphBar.style.height = currentHeight + 10 + 'px'

    var parent = graphBar.parentElement
    var amountElement = parent.children[2]

    if (counter) {
        var counterElementText = counter.innerText
        setTextContentOfElement(counter, '+ ' + Number((Number(counterElementText.replace('+ ', '')) || 0) + 1))
    }

    if (amountElement) {
        var amountElementText = amountElement.innerText
        setTextContentOfElement(amountElement, Number(amountElementText) + 1)
    }
}