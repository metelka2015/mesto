

function setInputValidState (config, input, errorElement) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

function setInputInvalidState (config, input, errorElement) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

function checkInputValidity (config, input) {
  const form = document.querySelector(config.formSelector);

  const errorElement = form.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState(config, input, errorElement);
  } else {
    setInputInvalidState(config, input, errorElement);
  }
}

function disableButton (config, button) {
  button.setAttribute('disabled', '');
  button.classList.add(config.inactiveButtonClass);
}

function enableButton (config, button) {
  button.removeAttribute('disabled');
  button.classList.remove(config.inactiveButtonClass);
}

function toggleButtonValidity (config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);

  if (form.checkValidity()) {
    enableButton(config, submitButton);
  } else {
    disableButton(config, submitButton);
  }
}

function setSubmitListener (config, form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    //form.reset();

    toggleButtonValidity(config, form);
  });
}

function enableValidation (config) {
  const forms = document.querySelector(config.formSelector);

  setSubmitListener(config, form);

  toggleButtonValidity(config, form);

  const inputs = form.querySelectorAll(config.inputSelector);
  const inputsArray = Array.from(inputs);

  inputsArray.forEach(function (input) {
    input.addEventListener('input', () => {
      checkInputValidity(config, input);
      toggleButtonValidity(config, form);
    });
  });
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error-message_visible'
});
