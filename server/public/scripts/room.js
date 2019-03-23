if (canMakeUseOfJavaScript()) {
    var joinUrl = window.location.href + '/join'
    new QRCode(document.getElementById('qrcode'), joinUrl)
}