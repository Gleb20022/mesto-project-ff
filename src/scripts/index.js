import "../pages/index.css";
import { createCard, likeCard, getCardForDeletion } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "../components/validation";
import {
  getUserData,
  getInitialCards,
  getInitialData,
  deleteMyCard,
  editProfile,
  postNewCard,
  updateNewAvatar,
} from "../components/api";
import { showLoadingBtn } from "../components/utils";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const popupEditProfile = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeEditProfileButton = popupEditProfile.querySelector(".popup__close");
const popupEditProfileForm = document.forms["edit-profile"];
const popupEditProfileNameInput = popupEditProfileForm.querySelector(
  ".popup__input_type_name"
);
const popupEditProfileDescriptionInput = popupEditProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileSaveButton = popupEditProfile.querySelector(".popup__button");

const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const closeAddButton = popupNewCard.querySelector(".popup__close");
const popupNewCardForm = document.forms["new-place"];
const popupNewCardNameInput = popupNewCardForm.querySelector(
  ".popup__input_type_card-name"
);
const popupNewCardLinkInput = popupNewCardForm.querySelector(
  ".popup__input_type_url"
);
const profileAddSaveButton = popupNewCard.querySelector(".popup__button");

const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = popupCard.querySelector(".popup__image");
const popupCardCaption = popupCard.querySelector(".popup__caption");
const popupCardCloseButton = popupCard.querySelector(".popup__close");

const profileImageCover = document.querySelector(".profile__image_cover");
const profileImage = document.querySelector(".profile__image");
const profilePopupAvatar = document.querySelector(".popup_type_avatar");
const closeProfileAvatarButton =
  profilePopupAvatar.querySelector(".popup__close");
const profileAvatarForm = document.forms["avatar_edit"];
const profileAvatarLinkInput = profileAvatarForm.querySelector(
  ".popup__input_type_url"
);
const profileAvatarSaveButton =
  profilePopupAvatar.querySelector(".popup__button");

const popupTypeDelete = document.querySelector(".popup_type_delete");
const popupCloseButton = popupTypeDelete.querySelector(".popup__close");
const deleteCardForm = document.querySelector('form[name="delete-card"');

function addCard(
  card,
  placesList,
  cardTemplate,
  createCard,
  likeCard,
  openModalImage,
  openDeletePopup,
  profileId
) {
  const cardElement = createCard(
    card,
    cardTemplate,
    likeCard,
    openModalImage,
    openDeletePopup,
    profileId
  );
  placesList.append(cardElement);
}

function fillCards(initialCards, profileId) {
  initialCards.forEach((card) => {
    addCard(
      card,
      placesList,
      cardTemplate,
      createCard,
      likeCard,
      openModalImage,
      openDeletePopup,
      profileId
    );
  });
}

profileEditButton.addEventListener("click", function () {
  openModal(popupEditProfile);
  fillPopupEditInputs();
  clearValidation(popupEditProfileForm, validationConfig);
});

closeEditProfileButton.addEventListener("click", function () {
  closeModal(popupEditProfile);
});

function fillPopupEditInputs() {
  popupEditProfileNameInput.value = profileTitle.textContent;
  popupEditProfileDescriptionInput.value = profileDescription.textContent;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const profileNameValue = popupEditProfileNameInput.value;
  const profileDescriptionValue = popupEditProfileDescriptionInput.value;

  showLoadingBtn(true, popupEditProfile.querySelector(".popup__button"));
  editProfileSaveButton.disabled = true;

  editProfile(profileNameValue, profileDescriptionValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      showLoadingBtn(false, popupEditProfile.querySelector(".popup__button"));
    });
}

popupEditProfileForm.addEventListener("submit", submitEditProfileForm);

profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
  popupNewCardForm.reset();
  clearValidation(popupNewCardForm, validationConfig);
});

closeAddButton.addEventListener("click", function () {
  closeModal(popupNewCard);
});

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();

  const cardName = popupNewCardNameInput.value;
  const cardLink = popupNewCardLinkInput.value;

  showLoadingBtn(true, popupNewCardForm.querySelector(".popup__button"));
  profileAddSaveButton.disabled = true;

  postNewCard(cardName, cardLink)
    .then((card) => {
      const newCard = createCard(
        card,
        cardTemplate,
        likeCard,
        openModalImage,
        openDeletePopup,
        profileId
      );
      placesList.prepend(newCard);
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupNewCardForm.reset();
      showLoadingBtn(false, popupNewCardForm.querySelector(".popup__button"));
    });
}

popupNewCardForm.addEventListener("submit", handleFormSubmitNewCard);

popupCardCloseButton.addEventListener("click", () => {
  closeModal(popupCard);
});

function openModalImage(evt) {
  openModal(popupCard);

  popupCardImage.setAttribute("src", evt.target.src);
  popupCardImage.setAttribute("alt", evt.target.alt);
  popupCardCaption.textContent = evt.target.alt;
}

profileImageCover.addEventListener("click", () => {
  openModal(profilePopupAvatar);
  profileAvatarForm.reset();
  clearValidation(profileAvatarForm, validationConfig);
});

closeProfileAvatarButton.addEventListener("click", () => {
  closeModal(profilePopupAvatar);
});

function handleAvatarChangeForm(evt) {
  evt.preventDefault();
  const linkValue = profileAvatarLinkInput.value;
  showLoadingBtn(true, profilePopupAvatar.querySelector(".popup__button"));
  profileAvatarSaveButton.disabled = true;
  updateNewAvatar(linkValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(profilePopupAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileAvatarForm.reset();
      showLoadingBtn(false, profileAvatarForm.querySelector(".popup__button"));
    });
}

profileAvatarForm.addEventListener("submit", handleAvatarChangeForm);

const openDeletePopup = () => {
  openModal(popupTypeDelete);
};

const closeDeletePopup = () => {
  closeModal(popupTypeDelete);
};

popupCloseButton.addEventListener("click", closeDeletePopup);

function deleteThisCard({ cardId, deleteButton }) {
  deleteMyCard(cardId)
    .then(() => {
      const deleteItem = deleteButton.closest(".places__item");
      deleteItem.remove();
      closeDeletePopup();
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleDeleteForm(evt) {
  evt.preventDefault();
  deleteThisCard(getCardForDeletion());
}

deleteCardForm.addEventListener("submit", handleDeleteForm);

let profileId;

Promise.all([getUserData(), getInitialCards()])
  .then((array) => {
    const [userList, initialCards] = array;
    profileTitle.textContent = userList.name;
    profileDescription.textContent = userList.about;
    profileId = userList._id;
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    fillCards(initialCards, profileId);
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation(validationConfig);
