import { Bookmark, Group } from "./entry.js";
import { state, enterGroup, goBack } from "./state.js";


const a = new Bookmark("AtCoder", "https://atcoder.jp");
const b = new Bookmark("Google", "https://google.com");
const g = new Group("nyaan");
g.add(a)

let root = new Group("root");
root.add(g)
//root.add(a);
root.add(b);
// データ持ってくる

enterGroup(root)

// bookmark追加
document.getElementById("addButton").addEventListener("click", () => {
    const titleInput = document.getElementById("titleInput");
    const urlInput = document.getElementById("urlInput");
    const inputError = document.getElementById("inputError");

    if (titleInput.value.trim() === "" || urlInput.value.trim() === "") {
        titleInput.classList.add("inputError")
        urlInput.classList.add("inputError")
        inputError.textContent = "タイトルとURLを入力してください";
        return;
    } else {
        titleInput.classList.remove("inputError")
        urlInput.classList.remove("inputError")
        inputError.textContent = "";
    }

    const bookmark = new Bookmark(titleInput.value, urlInput.value);
    state.displayGroup.add(bookmark);

    titleInput.value = "";
    urlInput.value = "";
})

document.getElementById("backButton").addEventListener("click", goBack);