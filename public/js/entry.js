import "../sass/style.scss";
import { removeFlashMsg } from "./modules/flash-messages";
import { search } from "./modules/search";

removeFlashMsg();

const searchBox = document.querySelector(".search");
searchBox.addEventListener("keyup", search);
