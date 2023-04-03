const editButtonLink = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup');
const editButtonPopupCloseButton = editButtonPopup.querySelector('.popup__close');
const nameInput = editButtonPopup.querySelector('.popup__input_type_name');
const jobInput = editButtonPopup.querySelector('.popup__input_type_job');
const editButtonPopupSubmit = editButtonPopup.querySelector('.popup__submit');
const editButtonPopupForm = editButtonPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

function handleClick() {
  editButtonPopup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButtonLink.addEventListener('click', handleClick);

editButtonPopupCloseButton.addEventListener('click', () => {
  editButtonPopup.classList.remove('popup_open');
});

editButtonPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editButtonPopup.classList.remove('popup_open');
});


