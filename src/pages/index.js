import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import avatarSrc from "../images/avatar.jpg";
import Api from "../utils/Api.js";

const spotsAvatar = document.getElementById("profile-avatar");
spotsAvatar.src = avatarSrc;

// Avatar form elements
const avatarEditModal = document.querySelector("#avatar-modal");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarForm = avatarEditModal.querySelector(".modal__form");
const avatarInput = avatarEditModal.querySelector("#profile-avatar-input");

const cardList = document.querySelector(".cards__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const editModalNameInput = editModal.querySelector("#name");
const editModalDescriptionInput = editModal.querySelector("#description");
const editModalForm = editModal.querySelector(".modal__form");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalImageUrl = newPostModal.querySelector("#card-image");
const newPostModalCaption = newPostModal.querySelector("#card-caption");
const newPostModalForm = newPostModal.querySelector(".modal__form");
const cardSubmitButton = newPostModal.querySelector(".modal__submit-button");

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

// Delete modal elements
const deleteModal = document.querySelector("#delete-post-modal");
const deleteModalButton = deleteModal.querySelector(".modal__delete-button");
const deleteCancelButton = deleteModal.querySelector(".modal__cancel-button");

const closeButtons = document.querySelectorAll(".modal__close-button");

const cardTemplate = document.querySelector("#card-template");

const modalElements = document.querySelectorAll(".modal");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a4f15128-4ba2-4653-a32c-921f0ed0e86f",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      cardList.append(getCardElement(card));
    });
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    spotsAvatar.src = userInfo.avatar;
  })
  .catch(console.error);

const initialCards = [
  {
    name: "Santa Barbara",
    link: "https://images.unsplash.com/photo-1590255041502-9a2603c6fd39?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Austin",
    link: "https://images.unsplash.com/photo-1583097090970-4d3b940ea1a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Salt Lake City",
    link: "https://images.unsplash.com/photo-1546017959-787be59bdcbb?q=80&w=1848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ventura",
    link: "https://images.unsplash.com/photo-1722113448751-5dc988a64ac9?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dallas",
    link: "https://images.unsplash.com/photo-1706197107449-fbd3fd1f49bc?q=80&w=2137&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "San Luis Obispo",
    link: "https://images.unsplash.com/photo-1571077597920-e2916988670d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKeyPress);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKeyPress);
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

function openEditModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editModalForm,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
}

function closeEditModal() {
  closeModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch(console.error);

  closeEditModal();
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  api
    .editUserAvatar({
      avatar: avatarInput.value,
    })
    .then((data) => {
      spotsAvatar.src = data.avatar;
    })
    .catch(console.error);

  closeModal(avatarEditModal);
}

avatarEditButton.addEventListener("click", () => {
  openModal(avatarEditModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

profileEditButton.addEventListener("click", openEditModal);

editModalForm.addEventListener("submit", handleProfileFormSubmit);

const handleEscapeKeyPress = (evt) => {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
};

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: newPostModalCaption.value,
    link: newPostModalImageUrl.value,
  };

  cardList.prepend(getCardElement(newCardData));

  closeModal(newPostModal);
  disableButton(cardSubmitButton, settings);
  evt.target.reset();
}

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostModalForm.addEventListener("submit", handleAddCardSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });

  trashButton.addEventListener("click", () => {
    openModal(deleteModal);
  });

  cardElementImage.addEventListener("click", () => {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;

    openModal(previewModal);
  });

  cardElementTitle.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;

  return cardElement;
}

initialCards.forEach((card) => {
  cardList.append(getCardElement(card));
});

modalElements.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(evt.target);
    }
  });
});

enableValidation(settings);
