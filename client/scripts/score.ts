// tslint:disable:no-var-keyword
// tslint:disable:prefer-template
// tslint:disable:prefer-const

type io = any

// Bootstrap the application with websockets or with <meta http-equiv=refresh content="5">
// The latter will only happen below IE6
; if (lastIndexOfExists()) {
    var socket = io()
} else {
    var metaRefreshTag = document.createElement('meta')
    metaRefreshTag.httpEquiv = 'refresh'
    metaRefreshTag.content = '5'
}
