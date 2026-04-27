import { Bookmark, Group } from "./entry.js";
import { enterGroup, goBack } from "./state.js";


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

document.getElementById("backButton").addEventListener("click", goBack);