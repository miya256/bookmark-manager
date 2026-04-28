import { state } from "./state.js";

export const menu = document.getElementById("menu");

export function showMenu(x, y, entry) {
    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.style.display = "block";
    state.selected = entry;
}


document.addEventListener("click", () => {
    menu.style.display = "none";
});


menu.addEventListener("click", (e) => {
    const action = e.target.dataset.action;

    if (action === "delete") {
        state.displayGroup.remove(state.selected);
    }
    if (action === "edit") {
        
    }

    menu.style.display = "none";
});