if (canMakeUseOfJavaScript()) {
    removeElementsThatNeedToBeRemoved()
    var addMoreOptionsForm = getHtmlElementsByClass('IncrementOptionsForm')[0]
    var questionFormFieldset = getHtmlElementsByClass('QuestionForm__fieldset')[1]
    var questionFormInputs = getHtmlElementsByClass('QuestionForm__input')
    if (questionFormInputs && questionFormInputs.length > 0) {
        var lastQuestionFormInput = questionFormInputs[questionFormInputs.length - 1]

        if (lastQuestionFormInput && lastQuestionFormInput.id) {
            var lastQuestionFormInputNumber = Number(lastQuestionFormInput.id.slice(lastQuestionFormInput.id.indexOf('-') + 1))
            var nextQuestionFormInputNumber = Number((lastQuestionFormInputNumber || 0) + 1)

            if (addMoreOptionsForm) {
                attachEventToElement(addMoreOptionsForm, 'submit', function (event) {
                    if (event.preventDefault) {
                        event.preventDefault()
                    }

                    if (questionFormFieldset && lastQuestionFormInput) {
                        var labelElement = document.createElement('label')
                        labelElement.htmlFor = 'option-' + nextQuestionFormInputNumber
                        labelElement.className = 'QuestionForm__label'
                        setTextContentOfElement(labelElement, 'Option ' + nextQuestionFormInputNumber)

                        var inputElement = document.createElement('input')
                        inputElement.type = 'text'
                        inputElement.name = 'option-' + nextQuestionFormInputNumber
                        inputElement.id = 'option-' + nextQuestionFormInputNumber
                        inputElement.placeholder = 'Your option goes here'
                        inputElement.className = 'QuestionForm__input Input'

                        questionFormFieldset.appendChild(labelElement)
                        questionFormFieldset.appendChild(inputElement)
                        nextQuestionFormInputNumber++
                    }

                    return false
                })
            }
        }
    }
}

function removeElementsThatNeedToBeRemoved() {
    var elements = getHtmlElementsByClass('removeIfJavaScriptEnabled')

    if (elements && elements.length > 0) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parentNode) {
                elements[i].parentNode.removeChild(elements[i])
            }
        }
    }
}