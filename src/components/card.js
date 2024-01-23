const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, deleteCard, addLike, openModalImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImg.src = card.link;
  cardImg.alt = card.name;

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  cardImg.addEventListener("click", openModalImage);
  cardLikeButton.addEventListener("click", addLike);

  return cardElement;
}

export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

export function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
