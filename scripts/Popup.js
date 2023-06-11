export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = document.querySelector('.popup__close');
    this.close = this.close.bind(this);
    this._handleEscClose = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose  (evt)  {
    if (evt.key === 'Escape') {
      this.close();
      }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}

