import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import {
  editButtonLink,
  editButtonPopup,
  nameInput,
  jobInput,
  editButtonPopupForm,
  addButtonLink,
  addButtonPopup,
  addButtonPopupForm,
  placeNameInput,
  placeLinkInput
  } from './constants.js';
import '../pages/index.css';


const profileValidator = new FormValidator(validationConfig, editButtonPopupForm);
const cardValidator = new FormValidator(validationConfig, addButtonPopupForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const cardsElements = new Section('.elements__list', {
  renderer: (item) => {
    cardsElements.addItem(createCard(item));
  }}
);

cardsElements.rendererItems(initialCards);

function createCard(cardData) {
  const card = new Card(cardData, '.place-template', () => {
    popupImage.open(cardData.name, cardData.link)});
  const cardElement = card.generateCard();
  return cardElement;
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupFormProfile = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
});

popupFormProfile.setEventListeners();

editButtonLink.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.job;
  popupFormProfile.open();
  });


const popupFormCard = new PopupWithForm('.popup_type_place', (cardData) => {
  cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const cardElement = createCard(cardData);
  popupFormCard.close();
  cardsElements.addItem(cardElement);
  cardValidator.toggleButtonValidity();
});

popupFormCard.setEventListeners();

addButtonLink.addEventListener('click', () => {
  popupFormCard.open();
})



