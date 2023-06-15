import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards, validationConfig } from "../scripts/constants.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
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
  placeLinkInput,
} from "../scripts/constants.js";
import "./index.css";

const profileValidator = new FormValidator(
  validationConfig,
  editButtonPopupForm
);
const cardValidator = new FormValidator(validationConfig, addButtonPopupForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

const cardsElements = new Section(".elements__list", {
  renderer: (item) => {
    cardsElements.addItem(createCard(item));
  },
});

cardsElements.rendererItems(initialCards);

const userInfo = new UserInfo(".profile__title", ".profile__subtitle");

const popupFormProfile = new PopupWithForm(".popup_type_profile", (data) => {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
});

popupFormProfile.setEventListeners();

const popupFormCard = new PopupWithForm(".popup_type_place", (cardData) => {
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

function createCard(cardData) {
  const card = new Card(cardData, ".place-template", () => {
    popupImage.open(cardData.name, cardData.link);
  });

  const cardElement = card.generateCard();

  return cardElement;
}

editButtonLink.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.job;
  popupFormProfile.open();
});

addButtonLink.addEventListener("click", () => {
  popupFormCard.open();
});
