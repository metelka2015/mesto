
class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _setInputValidState = (input, errorElement) => {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _setInputInvalidState = (input, errorElement) => {
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _checkInputValidity = (input) => {
    const errorElements = Array.from(this._formElement.querySelectorAll(`#error-${input.id}`));

    errorElements.forEach((errorElement) => {
      if (input.checkValidity()) {
        this._setInputValidState(input, errorElement);
      } else {
        this._setInputInvalidState(input, errorElement);
      }
    });
  }

  _disableButton (button) {
    button.setAttribute('disabled', '');
    button.classList.add(this._inactiveButtonClass);
  }

  _enableButton (button) {
    button.removeAttribute('disabled');
    button.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonValidity = () => {
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);

    if (this._formElement.checkValidity()) {
      this._enableButton(submitButton);
    } else {
      this._disableButton(submitButton);
    }
  }

  /*_setSubmitListener = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

      toggleButtonValidity(this._formElement);
    });
  }*/

 _getInputs = () => {
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    const inputsArray = Array.from(inputs);

    inputsArray.forEach((input) => {

      input.addEventListener('input', () => {

        this._checkInputValidity(input);

        this._toggleButtonValidity(this._formElement);
      });
    });
  }

  enableValidation () {
    const form = this._formElement.querySelector(this._formSelector);
    /*  this._setSubmitListener(form);*/
      this._toggleButtonValidity(form);
      this._getInputs(form);
     };
}

export default FormValidator;

