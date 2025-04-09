const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#name");
const editModalDescriptionInput = editModal.querySelector("#description");
const editModalForm = editModal.querySelector(".modal__form");

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalCloseButton = newPostModal.querySelector(
  ".modal__close-button"
);
const newPostModalImageUrl = newPostModal.querySelector("#card-image");
const newPostModalCaption = newPostModal.querySelector("#card-caption");
const newPostModalForm = newPostModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");

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
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openEditModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
}

function closeEditModal() {
  closeModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;

  closeEditModal();
}

profileEditButton.addEventListener("click", openEditModal);

editModalCloseButton.addEventListener("click", closeEditModal);

editModalForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: newPostModalCaption.value,
    link: newPostModalImageUrl.value,
  };

  document.querySelector(".cards__list").prepend(getCardElement(newCardData));

  closeModal(newPostModal);
}

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostModalCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
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
    cardElement.remove();
    cardElement = null;
  });

  cardElementTitle.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;

  return cardElement;
}

initialCards.forEach((card) => {
  document.querySelector(".cards__list").append(getCardElement(card));
});
