const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__error-message_visible",
};
const editButtonLink = document.querySelector(".profile__edit-button");
const editButtonPopup = document.querySelector(".popup_type_profile");
const nameInput = editButtonPopup.querySelector(".popup__input_type_name");
const jobInput = editButtonPopup.querySelector(".popup__input_type_job");
const editButtonPopupForm = editButtonPopup.querySelector(
  ".popup__form_type_profile"
);

const addButtonLink = document.querySelector(".profile__add-button-link");
const addButtonPopup = document.querySelector(".popup_type_place");
const addButtonPopupForm = addButtonPopup.querySelector(
  ".popup__form_type_place"
);
const placeNameInput = addButtonPopup.querySelector(
  ".popup__input_type_placename"
);
const placeLinkInput = addButtonPopup.querySelector(
  ".popup__input_type_placelink"
);
const editAvatarButton = document.querySelector('.profile__update-avatar');

export {
  initialCards,
  validationConfig,
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
  editAvatarButton,
};
