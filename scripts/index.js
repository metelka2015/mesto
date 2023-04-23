const editButtonLink = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup_type_profile');
const editButtonPopupClose = editButtonPopup.querySelector('.popup__close');
const nameInput = editButtonPopup.querySelector('.popup__input_type_name');
const jobInput = editButtonPopup.querySelector('.popup__input_type_job');
const editButtonPopupSubmit = editButtonPopup.querySelector('.popup__submit');
const editButtonPopupForm = editButtonPopup.querySelector('.popup__form_type_profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const addButtonLink = document.querySelector('.profile__add-button-link');
const addButtonPopup = document.querySelector('.popup_type_place');
const addButtonPopupClose = addButtonPopup.querySelector('.popup__close');
const addButtonPopupSubmit = addButtonPopup.querySelector('.popup__submit');

const templatePlace = document.getElementById('place-template');
const elementsList = document.querySelector('.elements__list');
const addButtonPopupForm = addButtonPopup.querySelector('.popup__form_type_place');
const viewerImagePopup = document.querySelector('.popup_type_image');
const viewerImagePopupClose = viewerImagePopup.querySelector('.popup__close');

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
  const viewerImage = cardElement.querySelector('.element__image');

  const handleDelete = () => {
    cardElement.remove();
  }

  const handleLike = () => {
    likeButton.classList.toggle('element__like-button_active');
  }

  const handleViewer = () => {
    openPopup(viewerImagePopup);
    const image = viewerImagePopup.querySelector('.popup__image');
    const figcaption = viewerImagePopup.querySelector('.popup__caption');

    image.src = cardData.link;
    figcaption.textContent = cardData.name;
    image.alt = cardData.name;
  }

  deleteButton.addEventListener('click', handleDelete);

  likeButton.addEventListener('click', handleLike);

  viewerImage.addEventListener('click',handleViewer)

  return cardElement;
}

const handleAddCardSubmit = (event) => {
  event.preventDefault();

  const placeNameInput = addButtonPopup.querySelector('.popup__input_type_placename');
  const placeLinkInput = addButtonPopup.querySelector('.popup__input_type_placelink');

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const cardData = {
    name,
    link,
  }

  renderCardElement(createCardElement(cardData));
  closePopup(addButtonPopup);
}

const renderCardElement = (cardElement) => {
  elementsList.prepend(cardElement);
}

initialCards.forEach((Cards) => {
  renderCardElement(createCardElement(Cards));
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function handleClick() {
  openPopup(editButtonPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editButtonPopup);
}

editButtonLink.addEventListener('click', handleClick);
editButtonPopupForm.addEventListener('submit', handleSubmit);

editButtonPopupClose.addEventListener('click', () => {
  closePopup(editButtonPopup);
});

addButtonLink.addEventListener('click', () => {
  openPopup(addButtonPopup);
})

addButtonPopupClose.addEventListener('click', () => {
  closePopup(addButtonPopup);
});

viewerImagePopupClose.addEventListener('click', () => {
  closePopup(viewerImagePopup);
});

addButtonPopupForm.addEventListener('submit', handleAddCardSubmit);






