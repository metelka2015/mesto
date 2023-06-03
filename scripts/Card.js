class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _handleDelete = () => {
    this._element.remove();
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleViewer = () => {
    this._handleOpenPopup(this._name, this._link);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleDelete);

    this._likeButton.addEventListener('click', this._handleLike);

    this._cardImage.addEventListener('click', this._handleViewer);
  }
}

export default Card;
