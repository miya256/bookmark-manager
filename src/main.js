import { Bookmark, Group } from "./entry.js";
import { now, enterGroup, goBack } from "./state.js";


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

document.getElementById("saveButton").addEventListener("click", () => {
    const titleInput = document.getElementById("titleInput");
    const urlInput = document.getElementById("urlInput");
    const title = titleInput.value;
    const url = urlInput.value;

    if (title.trim() === "" || url.trim() === "") {
        const error = document.getElementById("error");
        error.textContent = "タイトルとURLを入力してください";
        return;
    } else {
        error.textContent = "";
    }

    const bookmark = new Bookmark(title, url);
    now.add(bookmark);

    titleInput.value = "";
    urlInput.value = "";
})
document.getElementById("backButton").addEventListener("click", goBack);