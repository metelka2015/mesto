class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputs = this._formElement.querySelectorAll(this._inputSelector);
  }

  _setInputValidState = (input, errorElement) => {
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _setInputInvalidState = (input, errorElement) => {
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  };

  _checkInputValidity = (input) => {
    const errorElement = this._formElement.querySelector(`#error-${input.id}`);

    if (input.checkValidity()) {
      this._setInputValidState(input, errorElement);
    } else {
      this._setInputInvalidState(input, errorElement);
    }
  };

  _disableButton() {
    this._submitButton.setAttribute("disabled", "");
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    this._submitButton.removeAttribute("disabled");
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  toggleButtonValidity = () => {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  /*_setSubmitListener = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.toggleButtonValidity();
    });
  }*/

  _setInputsListeners = () => {
    const inputsArray = Array.from(this._inputs);

    inputsArray.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonValidity(this._formElement);
      });
    });
  };

  enableValidation() {
    /*this._setSubmitListener();*/
    this.toggleButtonValidity();
    this._setInputsListeners();
  }
}

export default FormValidator;
