class Card {
constructor({data, profileInfo, templateSelector, handleCardClick, handleDeleteClick, addLike, removeLike}) {
    this._card = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._profileId = profileInfo._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    //this._likeCounter = this._element.querySelector('.element__like-counter');
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._userId = data.owner._id
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__delete-button");

    if (this._verifyLike()) {
      this._likeButton.classList.add("element__like-button_active");
    }
     if (this._userId == this._profileId) {
      this._deleteButton.classList.add('element__delete-button_active');
    }

    this._element.querySelector(".element__like-counter").textContent = this._likes.length;
    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  getCurrentCard() {
    return this._card;
  }

  handleDelete() {
    this._element.remove();
    this._element = null;
  };

  handleLike(data)  {
    this._likes = data.likes;
    this._addLikeCounter(data);
    if (this._verifyLike()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove("element__like-button_active");
    }
  };

  _addLikeCounter(data) {
    this._element.querySelector(".element__like-counter").textContent = data.likes.length;
  }

  _handleViewer(data) {
    this._handleCardClick(data);
  }

  _verifyLike() {
    return Boolean(this._likes.find((item) => {
      item._id == this._profileId;
    }
    ));
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick(this._card._id));

    this._likeButton.addEventListener("click", () => {
      if (this._verifyLike()) {
        this._removeLike();
      } else {
        this._addLike();
      }
    });

    this._cardImage.addEventListener("click", () => {
      this._handleViewer(this._card);
    });
  }
}

export default Card;
