let editModal = document.querySelector("#edit-modal");
let profileEditButton = document.querySelector(".profile__edit-button");
let closeModalButton = editModal.querySelector(".modal__close-button");

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

function toggleModal() {
  editModal.classList.toggle("modal_opened");
}

profileEditButton.addEventListener("click", toggleModal);

closeModalButton.addEventListener("click", toggleModal);
