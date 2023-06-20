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
  editAvatarButton,
} from "../scripts/constants.js";
import "./index.css";
import Api from "../scripts/Api.js";
import PopupDeleteCard from "../scripts/PopupDeleteCard.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "13586674-c353-49e6-be07-3fb91b47b641",
  },
});

const profileValidator = new FormValidator(
  validationConfig,
  editButtonPopupForm
);
const cardValidator = new FormValidator(validationConfig, addButtonPopupForm);
const avatarValidator = new FormValidator(
  validationConfig,
  document.querySelector(".popup__form_type_avatar")
);

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

const cardsElements = new Section(".elements__list", {
  renderer: (item) => {
    cardsElements.addItem(createCard(item));
  },
});

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

let profileInfo;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([res, array]) => {
    profileInfo = res;
    userInfo.setUserInfo(res);
    console.log(res);
    cardsElements.rendererItems(array);
    console.log(array);
  })
  .catch((error) => {
    console.log(error);
  });

const popupFormProfile = new PopupWithForm(".popup_type_profile", (data) => {
  popupFormProfile.setButtonText(true);
  api
    .setProfileInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormProfile.close();
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupFormProfile.setButtonText(false);
    });
});
popupFormProfile.setEventListeners();

const popupFormCard = new PopupWithForm(".popup_type_place", (cardData) => {
  cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  popupFormCard.setButtonText(true);
  api
    .addNewCard(cardData)
    .then((item) => {
      const cardElement = createCard(item);
      popupFormCard.close();
      cardsElements.addItem(cardElement);
      cardValidator.toggleButtonValidity();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      popupFormProfile.setButtonText(false);
    });
});
popupFormCard.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(".popup_type_delete");
popupDeleteCard.setEventListeners();

function createCard(cardData) {
  const card = new Card({
    data: cardData,
    profileInfo: profileInfo,
    templateSelector: ".place-template",
    handleCardClick: () => {
      popupImage.open(cardData.name, cardData.link);
    },
    handleDeleteClick: (cardId) => {
      popupDeleteCard.confirmDelete(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.handleDelete();
            popupDeleteCard.close();
          })
          .catch((error) => {
            console.log(error);
          });
      });
      popupDeleteCard.open();
    },
    addLike: () => {
      api
        .addLike(card.getCurrentCard()._id)
        .then((res) => {
          card.handleLike(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeLike: () => {
      api
        .removeLike(card.getCurrentCard()._id)
        .then((item) => {
          card.handleLike(item);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const cardElement = card.generateCard();
  return cardElement;
}

const popupAvatar = new PopupWithForm(".popup_type_avatar", (data) => {
  popupAvatar.setButtonText(true);
  api
    .editNewAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
      console.log(res);
    })
    .catch((error) => console.log(error))
    .finally(() => popupAvatar.setButtonText(false));
});
popupAvatar.setEventListeners();

editButtonLink.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;
  popupFormProfile.open();
});

addButtonLink.addEventListener("click", () => {
  popupFormCard.open();
});

editAvatarButton.addEventListener("click", () => {
  popupAvatar.open();
});
