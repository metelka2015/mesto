import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._submitButton = this._popup.querySelector(".popup__submit");
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._buttonText = this._submitButton.texcontent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  /*setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name]
    })
  }*/

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  setButtonText(isSending) {
    this._submitButton.textContent = isSending ? 'Сохранение...' : this._buttonText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
