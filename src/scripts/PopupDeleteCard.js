import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selector) {
    super(selector);
  }

  confirmDelete(submit) {
    this._handleSubmit = submit;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
