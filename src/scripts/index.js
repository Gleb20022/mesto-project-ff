import "../pages/index.css";
import { initialCards } from "../components/cards";
import { createCard, deleteCard, addLike } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "../components/validation";

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
  openModal(popupEditProfile);
  popupEditProfileForm.reset();
  clearValidation(popupEditProfileForm, validationConfig);

  popupEditProfileNameInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
  popupNewCardForm.reset();
  clearValidation(popupNewCardForm, validationConfig);
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
enableValidation(validationConfig);
