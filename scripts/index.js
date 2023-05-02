const editButtonLink = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup_type_profile');
const nameInput = editButtonPopup.querySelector('.popup__input_type_name');
const jobInput = editButtonPopup.querySelector('.popup__input_type_job');
const editButtonPopupSubmit = editButtonPopup.querySelector('.popup__submit');
const editButtonPopupForm = editButtonPopup.querySelector('.popup__form_type_profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const addButtonLink = document.querySelector('.profile__add-button-link');
const addButtonPopup = document.querySelector('.popup_type_place');
const addButtonPopupSubmit = addButtonPopup.querySelector('.popup__submit');
const addButtonPopupForm = addButtonPopup.querySelector('.popup__form_type_place');
const placeNameInput = addButtonPopup.querySelector('.popup__input_type_placename');
const placeLinkInput = addButtonPopup.querySelector('.popup__input_type_placelink');

const templatePlace = document.getElementById('place-template');
const elementsList = document.querySelector('.elements__list');

const viewerImagePopup = document.querySelector('.popup_type_image');
const image = viewerImagePopup.querySelector('.popup__image');
const figcaption = viewerImagePopup.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

const popupAll = Array.from(document.querySelectorAll('.popup'));

const createCardElement = (cardData) => {
  const cardElement = templatePlace.content
    .querySelector('.element')
    .cloneNode(true);

  const cardName = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');

  const handleDelete = () => {
    cardElement.remove();
  }

  const handleLike = () => {
    likeButton.classList.toggle('element__like-button_active');
  }

  const handleViewer = () => {
    openPopup(viewerImagePopup);

    image.src = cardData.link;
    figcaption.textContent = cardData.name;
    image.alt = cardData.name;
  }

  deleteButton.addEventListener('click', handleDelete);

  likeButton.addEventListener('click', handleLike);

  cardImage.addEventListener('click',handleViewer)

  return cardElement;
}

const handleAddCardSubmit = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const cardData = {
    name,
    link,
  }

  event.target.reset();

  event.submitter.classList.add('popup__submit_disabled');
  event.submitter.disabled = true;

  renderCardElement(createCardElement(cardData));

  closePopup(addButtonPopup);
}

const renderCardElement = (cardElement) => {
  elementsList.prepend(cardElement);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
})

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function openPopupAddCard() {
  openPopup(addButtonPopup);
  addButtonPopupForm.reset();
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openProfilePopup() {
  openPopup(editButtonPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editButtonPopup);
}

popupAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});


editButtonLink.addEventListener('click', openProfilePopup);
editButtonPopupForm.addEventListener('submit', handleProfileFormSubmit);

addButtonLink.addEventListener('click', () => {
  openPopupAddCard(addButtonPopup);
})

addButtonPopupForm.addEventListener('submit', handleAddCardSubmit);





