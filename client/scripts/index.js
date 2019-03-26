if (canMakeUseOfJavaScript()) {
    var addMoreOptionsForm = getHtmlElementsByClass('IncrementOptionsForm')[0]
    var questionFormFieldset = getHtmlElementsByClass('QuestionForm__fieldset')[1]
    var questionFormInputs = getHtmlElementsByClass('QuestionForm__input')
    var lastQuestionFormInput = questionFormInputs[questionFormInputs.length - 1]
    var lastQuestionFormInputNumber = Number(lastQuestionFormInput.id.slice(lastQuestionFormInput.id.indexOf('-') + 1))
    var nextQuestionFormInputNumber = Number(lastQuestionFormInputNumber + 1)

    if (addMoreOptionsForm) {
        attachEventToElement(addMoreOptionsForm, 'submit', function (event) {
            event.preventDefault()

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
            }
        })
    }
}