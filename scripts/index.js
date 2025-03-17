const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#name");
const editModalDescriptionInput = editModal.querySelector("#description");

const initialCards = [
  {
    name: "Santa Barbara",
    link: "https://unsplash.com/photos/people-walking-on-beach-during-daytime-qN2UhvqAU3Y",
  },
  {
    name: "Austin",
    link: "https://unsplash.com/photos/black-and-red-unks-building-pbrvz7emGDE",
  },
  {
    name: "Salt Lake City",
    link: "https://unsplash.com/photos/parked-cars-in-the-middle-of-city-with-high-rise-buildings-jozagDIvslM",
  },
  {
    name: "Ventura",
    link: "https://unsplash.com/photos/an-overhead-view-of-a-city-street-with-buildings-hNkrzwuaxZg",
  },
  {
    name: "Dallas",
    link: "https://unsplash.com/photos/a-car-parked-on-the-side-of-the-road-at-night-IK4vMYFnzZA",
  },
  {
    name: "San Luis Obispo",
    link: "https://unsplash.com/photos/photo-of-mountain-and-city-scenery-mHDdwWwoVvw",
  },
];

function openEditModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeEditModal() {
  editModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;

  closeEditModal();
}

profileEditButton.addEventListener("click", openEditModal);

editModalCloseButton.addEventListener("click", closeEditModal);

editModal
  .querySelector(".modal__form")
  .addEventListener("submit", handleProfileFormSubmit);
