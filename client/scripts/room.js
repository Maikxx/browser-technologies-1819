if (canMakeUseOfJavaScript()) {
    var href = window.location.href
    var joinUrl = href + '/join'
    new QRCode(document.getElementById('qrcode'), joinUrl)

    var timeToWaitInSeconds = 90 * 1000
    var countDownDate = new Date().getTime() + timeToWaitInSeconds
    var interval = setInterval(function() {
        var now = new Date().getTime()
        var duration = countDownDate - now

        setTextContentOfElement(document.getElementById('countdown-timer'), Math.round(duration / 1000))

        if (duration < 0) {
            clearInterval(interval)
            window.location.replace(href + '/score')
        }
    }, 1000)
}