const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButtonLink = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup_type_profile');
const editButtonPopupCloseButton = editButtonPopup.querySelector('.popup__close');
const nameInput = editButtonPopup.querySelector('.popup__input_type_name');
const jobInput = editButtonPopup.querySelector('.popup__input_type_job');
const editButtonPopupSubmit = editButtonPopup.querySelector('.popup__submit');
const editButtonPopupForm = editButtonPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const addButtonLink = document.querySelector('.profile__add-button-link');
const addButtonPopup = document.querySelector('.popup_type_place');
const addButtonPopupClose = addButtonPopup.querySelector('.popup__close');
const placeNameInput = addButtonPopup.querySelector('.popup__input_type_placename');
const placeLinkInput = addButtonPopup.querySelector('.popup__input_type_placelink');
const addButtonPopupSubmit = addButtonPopup.querySelector('.popup__submit');
const addButtonPopupForm = addButtonPopup.querySelector('.popup__form');
const placeName = document.querySelector('.profile__title');
const placeLink = document.querySelector('.profile__subtitle');

function handleClick() {
  editButtonPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleClickAdd() {
  addButtonPopup.classList.add('popup_opened');
  placeName.value = placeName.textContent;
  placeLink.value = placeLink.textContent;
}

function closePopup() {
  editButtonPopup.classList.remove('popup_opened');
}

function closePopupPlace() {
  addButtonPopup.classList.remove('popup_opened');
}

function handleSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editButtonPopup.classList.remove('popup_opened');
}

function handleCreate(event) {
  event.preventDefault();
  placeName.textContent = placeName.value;
  placeLink.textContent = placeLink.value;
  addButtonPopup.classList.remove('popup_opened');
}

editButtonLink.addEventListener('click', handleClick);

editButtonPopupCloseButton.addEventListener('click', closePopup);

editButtonPopupForm.addEventListener('submit', handleSubmit);

addButtonLink.addEventListener('click', handleClickAdd);

addButtonPopupClose.addEventListener('click', closePopupPlace);

addButtonPopupForm.addEventListener('submit', handleCreate);

