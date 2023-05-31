import { openPopup, viewerImagePopup, image, figcaption } from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _handleDelete = () => {
    this._element.remove();
  }

  _handleLike = () => {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.classList.toggle('element__like-button_active');
  }

  _handleViewer = () => {
    openPopup(viewerImagePopup);

    image.src = this._link;
    figcaption.textContent = this._name;
    image.alt = this._name;
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    const cardImage = this._element.querySelector('.element__image');
    cardImage.addEventListener('click', () => {
      this._handleViewer();
    });
  }
}


export default Card;
