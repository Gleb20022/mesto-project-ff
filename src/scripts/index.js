import "../pages/index.css";
import { initialCards } from "../components/cards";
import { createCard, deleteCard, addLike } from "../components/card";
import { openModal, closeModal } from "../components/modal";

const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupEditProfileForm = document.forms["edit-profile"];
const popupEditProfileNameInput = popupEditProfileForm.elements.name;
const popupEditProfileDescriptionInput =
  popupEditProfileForm.elements.description;

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupNewCardNameInput = popupNewCardForm.elements["place-name"];
const popupNewCardLinkInput = popupNewCardForm.elements.link;

const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardCaption = document.querySelector(".popup__caption");

const closeButtons = document.querySelectorAll(".popup__close");

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, addLike, openModalImage));
});

profileEditButton.addEventListener("click", function () {
  popupEditProfileNameInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

closeButtons.forEach((item) => {
  item.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");

    closeModal(popup);
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupEditProfileNameInput.value;
  profileDescription.textContent = popupEditProfileDescriptionInput.value;

  closeModal(popupEditProfile);
}

popupEditProfileForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();

  const card = {};
  card.name = popupNewCardNameInput.value;
  card.link = popupNewCardLinkInput.value;

  placesList.prepend(createCard(card, deleteCard, addLike, openModalImage));

  closeModal(popupNewCard);
  popupNewCardForm.reset();
}

popupNewCardForm.addEventListener("submit", handleFormSubmitNewCard);

function openModalImage(evt) {
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  popupCardCaption.textContent = evt.target.alt;

  openModal(popupCard);
}

//validity
// const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__input');
// const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit_inactive');
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();



