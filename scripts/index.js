import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


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

//const popupAll = Array.from(document.querySelectorAll('.popup__form'));

//const viewerImage = document.querySelector('.popup_type_image');
//const image = viewerImage.querySelector('.popup__image');
//const figcaption = viewerImage.querySelector('.popup__caption');

const profileValidator = new FormValidator(validationConfig, editButtonPopupForm);
const cardValidator = new FormValidator(validationConfig, addButtonPopupForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

const popupFormProfile = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
});

popupFormProfile.setEventListeners();


const popupFormCard = new PopupWithForm('.popup_type_place', handleAddCardSubmit);
popupFormCard.setEventListeners();

const PopupImage = new PopupWithImage('.popup_type_image');
PopupImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const handleAddCardSubmit = (event) => {
 event.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const cardData = {
    name,
    link,
  }

  /*popupFormCard._getInputValues(cardData);*/

  event.target.reset();

  renderCardElement(createCard(cardData));

  popupFormCard.close();

  cardValidator.toggleButtonValidity();
}

const renderCardElement = (cardElement) => {
  elementsList.prepend(cardElement);
}

/*function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/*function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}*/

/*function openPopupAddCard() {
  openPopup(addButtonPopup);
  addButtonPopupForm.reset();
}

/*function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}*/

/*function openProfilePopup() {
  openPopup(editButtonPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}*/

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupFormProfile.close();
}

function handleOpenPopup() {
  //image.src = link;
  //figcaption.textContent = name;
  //image.alt = name;
  PopupImage.open(this._name, this._link);
}

function createCard(cardData) {
  const card = new Card(cardData, '.place-template', (cardData) => {
    PopupImage.open(cardData.name, cardData.link)});
  const cardElement = card.generateCard();
  return cardElement;
}




/*popupAll.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});*/

initialCards.forEach((item) => {
  renderCardElement(createCard(item));
})

/*closeButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});*/


editButtonLink.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.textContent;
  jobInput.value = getUserInfo.textContent;
  popupFormProfile.open();
  });

  


/*editButtonPopupForm.addEventListener('submit', handleProfileFormSubmit);*/
addButtonLink.addEventListener('click', () => {
  popupFormCard.open();
})
addButtonPopupForm.addEventListener('submit', handleAddCardSubmit);

export { profileName, profileJob };







