import "../sass/style.scss";
import "./modules/fa-regular.min";
import "./modules/fontawesome.min";
import { removeFlashMsg } from "./modules/flash-messages";
import { search } from "./modules/search";
import { updateUserList } from "./modules/update-user-lists";
import { addReview } from "./modules/add-review";

removeFlashMsg();

const searchBox = document.querySelector(".search");
searchBox.addEventListener("keyup", search);

const watchlistSwitch = document.querySelector("#add-to-watchlist");
if (typeof watchlistSwitch !== "undefined" && watchlistSwitch !== null) {
  watchlistSwitch.addEventListener("click", updateUserList);
}

const watchedBtn = document.querySelector("#add-to-watched");
if (typeof watchedBtn !== "undefined" && watchedBtn !== null) {
  watchedBtn.addEventListener("click", updateUserList);
}

const favoriteBtn = document.querySelector("#add-to-favorite");
if (typeof favoriteBtn !== "undefined" && favoriteBtn !== null) {
  favoriteBtn.addEventListener("click", updateUserList);
}

const removeFromListBtn = document.querySelectorAll(".remove-from-list");
if (typeof removeFromListBtn !== "undefined" && removeFromListBtn !== null) {
  const removeItem = function() {
    updateUserList.call(this);
    removeDomElement.call(this);
  };
  const removeDomElement = function() {
    this.parentElement.parentElement.remove();
  };
  Array.from(removeFromListBtn).forEach(function(ele) {
    ele.addEventListener("click", removeItem);
  });
}

const addReviewForm = document.querySelector("#add-review");
if (typeof removeFromListBtn !== "undefined" && removeFromListBtn !== null) {
  addReviewForm.addEventListener("submit", addReview);
}
