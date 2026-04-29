import { state } from "./state.js";
import { hideMenu, render, renderMenu } from "./view.js";
import { Bookmark, Group } from "./entry.js";


// 画面遷移
export function setCurrentGroup(group) {
    if (state.currentGroup) state.history.push(state.currentGroup);
    state.currentGroup = group;
    render(group);
}

export function goBack() {
    if (state.history.length > 0) {
        setCurrentGroup(state.history.pop());
    }
}

document.getElementById("back-button").addEventListener("click", goBack);


// entry操作
export function addBookmark(title, url) {
    const bookmark = new Bookmark(title, url);
    state.currentGroup.add(bookmark);
    render(state.currentGroup);
}

export function addGroup(title) {
    const group = new Group(title);
    state.currentGroup.add(group);
    render(state.currentGroup);
}

function removeBookmark(entry) {
    state.currentGroup.remove(entry);
    render(state.currentGroup);
}

document.getElementById("bookmark-add-button").addEventListener("click", () => {
    const titleInput = document.getElementById("bookmark-title-input");
    const urlInput = document.getElementById("bookmark-url-input");
    const inputError = document.getElementById("bookmark-input-error");

    if (titleInput.value.trim() === "" || urlInput.value.trim() === "") {
        titleInput.classList.add("input-error")
        urlInput.classList.add("input-error")
        inputError.textContent = "タイトルとURLを入力してください";
        return;
    } else {
        titleInput.classList.remove("input-error")
        urlInput.classList.remove("input-error")
        inputError.textContent = "";
    }

    addBookmark(titleInput.value, urlInput.value);

    titleInput.value = "";
    urlInput.value = "";
})


// ContextMenu
const menu = document.getElementById("menu")

export function showMenu(x, y, entry) {
    menu.style.left = x + "px";
    menu.style.top = y + "px";
    state.selected = entry;
    renderMenu(menu);
}

document.addEventListener("click", () => {
    hideMenu(menu);
});

menu.addEventListener("click", (e) => {
    const action = e.target.dataset.action;

    if (action === "delete") {
        removeBookmark(state.selected);
    }
    if (action === "edit") {
        
    }

    hideMenu(menu);
});