import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;

    this._submitButton = this._popup.querySelector('.popup__submit');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
