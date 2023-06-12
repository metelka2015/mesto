export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = document.querySelector('.popup__close');
    this.close = this.close.bind(this);
    this._handleEscClose = this.close.bind(this);

  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}

