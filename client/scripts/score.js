// Bootstrap the application with websockets or with <meta http-equiv=refresh content="5">
// The latter will only happen below IE6
; if (lastIndexOfExists()) {
    var socket = io()
} else if (getElementsByTagNameExists() && appendChildExists()) {
    var metaRefreshTag = document.createElement('meta')
    var headElement = document.body.getElementsByTagName('head')[0]
    metaRefreshTag.httpEquiv = 'refresh'
    metaRefreshTag.content = '5'

    if (headElement) {
        headElement.appendChild(metaRefreshTag)
    }
}
