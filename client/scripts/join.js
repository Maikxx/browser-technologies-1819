// Bootstrap the application with websockets (IE6+, hence the checks)
if (lastIndexOfExists() && getElementsByTagNameExists() && getAttributeExists()) {
    var socket = io()

    var forms = document.getElementsByTagName('form')
    for (var i = 0; i < forms.length; i++) {
        if (forms[i].hasAttribute('data-room-id') && forms[i].hasAttribute('data-answer-id')) {
            forms[i].onsubmit = onFormSubmit(forms[i])
        }
    }
}

function onFormSubmit(form) {
    return function() {
        socket.emit('score added', {
            roomId: form.getAttribute('data-room-id'),
            answerId: form.getAttribute('data-answer-id'),
        })
    }
}