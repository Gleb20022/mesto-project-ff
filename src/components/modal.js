const popupState = {
  openPopupClass: "popup_is-opened",
  animatedPopupClass: "popup_is-animated",
};

export function openModal(modal) {
  modal.classList.add(popupState.animatedPopupClass);

  const addOpenClass = function () {
    modal.classList.add(popupState.openPopupClass);
  };

  setTimeout(addOpenClass, 0);

  document.addEventListener("keydown", closePopupOnESC);
  document.addEventListener("mousedown", closePopupOverlay);
}

export function closeModal(modal) {
  modal.classList.remove(popupState.openPopupClass);

  function removeAnimatedClass() {
    modal.classList.remove(popupState.animatedPopupClass);
  }

  setTimeout(removeAnimatedClass, 600);

  document.removeEventListener("keydown", closePopupOnESC);
  document.removeEventListener("mousedown", closePopupOverlay);
}

function closePopupOnESC(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector("." + popupState.openPopupClass);

    closeModal(openedModal);
  }
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains(popupState.openPopupClass)) {
    closeModal(evt.target);
  }
}
