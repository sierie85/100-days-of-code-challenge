import "../sass/style.scss";
import "./modules/fa-regular.min";
import "./modules/fontawesome.min";
import { removeFlashMsg } from "./modules/flash-messages";
import { search } from "./modules/search";
import { updateUserList } from "./modules/update-user-lists";

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
