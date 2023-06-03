import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';


const editButtonLink = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup_type_profile');
const nameInput = editButtonPopup.querySelector('.popup__input_type_name');
const jobInput = editButtonPopup.querySelector('.popup__input_type_job');

const editButtonPopupForm = editButtonPopup.querySelector('.popup__form_type_profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const addButtonLink = document.querySelector('.profile__add-button-link');
const addButtonPopup = document.querySelector('.popup_type_place');

const addButtonPopupForm = addButtonPopup.querySelector('.popup__form_type_place');
const placeNameInput = addButtonPopup.querySelector('.popup__input_type_placename');
const placeLinkInput = addButtonPopup.querySelector('.popup__input_type_placelink');

const elementsList = document.querySelector('.elements__list');

const closeButtons = document.querySelectorAll('.popup__close');

const popupAll = Array.from(document.querySelectorAll('.popup'));

const viewerImagePopup = document.querySelector('.popup_type_image');
const image = viewerImagePopup.querySelector('.popup__image');
const figcaption = viewerImagePopup.querySelector('.popup__caption');


const handleAddCardSubmit = (event) => {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const cardData = {
    name,
    link,
  }

  event.target.reset();

  renderCardElement(createCard(cardData));

  closePopup(addButtonPopup);

  cardValidator.toggleButtonValidity();
}

const renderCardElement = (cardElement) => {
  elementsList.prepend(cardElement);
}

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

function handleOpenPopup(name, link) {
  image.src = link;
  figcaption.textContent = name;
  image.alt = name;
  openPopup(viewerImagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, '.place-template', handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

popupAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

initialCards.forEach((item) => {
  renderCardElement(createCard(item));
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});


editButtonLink.addEventListener('click', openProfilePopup);
editButtonPopupForm.addEventListener('submit', handleProfileFormSubmit);
addButtonLink.addEventListener('click', () => {
  openPopupAddCard(addButtonPopup);
})
addButtonPopupForm.addEventListener('submit', handleAddCardSubmit);


const profileValidator = new FormValidator(validationConfig, editButtonPopupForm);
const cardValidator = new FormValidator(validationConfig, addButtonPopupForm);

profileValidator.enableValidation();
cardValidator.enableValidation();





