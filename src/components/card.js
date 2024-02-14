import { putLike, deleteLike } from "./api.js";

let currentCardId;
let currentDeleteButton;

export function likeCard(likeButton, likeCounter, cardId) {
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createCard(
  card,
  cardTemplate,
  likeCard,
  openModalImage,
  openDeletePopup,
  profileId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-count");

  const cardId = card._id;
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === profileId);

  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, likeCounter, cardId);
  });

  cardImg.addEventListener("click", openModalImage);

  if (card.owner._id !== profileId) {
    cardDeleteButton.classList.add("card__delete-button-unactive");
  } else {
    cardDeleteButton.addEventListener("click", () => {
      currentCardId = cardId;
      currentDeleteButton = cardDeleteButton;
      openDeletePopup();
    });
  }

  return cardElement;
}

export function getCardForDeletion() {
  return { cardId: currentCardId, deleteButton: currentDeleteButton };
}
