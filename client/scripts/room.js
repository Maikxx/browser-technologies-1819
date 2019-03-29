if (canMakeUseOfJavaScript()) {
    var href = window.location.href
    var joinUrl = href + '/join'
    new QRCode(document.getElementById('qrcode'), joinUrl)

    const qrCodeImage = document.getElementsByTagName('img')[0]
    if (qrCodeImage) {
        qrCodeImage.alt = 'Scan this QR code to join the poll'

        var timeToWaitInSeconds = 90 * 1000
        var timer = document.getElementById('countdown-timer')
        var countDownDate = new Date().getTime() + timeToWaitInSeconds
        if (timer) {
            var interval = setInterval(function() {
                var now = new Date().getTime()
                var duration = countDownDate - now
                setTextContentOfElement(timer, Math.round(duration / 1000))

                if (duration < 0) {
                    clearInterval(interval)
                    window.location.replace(href + '/score')
                }
            }, 1000)
        }
    }
}