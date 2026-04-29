import { setCurrentGroup } from "./controller.js";

import { Bookmark, Group } from "./entry.js";


const a = new Bookmark("AtCoder", "https://atcoder.jp");
const b = new Bookmark("Google", "https://google.com");
const g = new Group("nyaan");
g.add(a)

let root = new Group("root");
root.add(g)
//root.add(a);
root.add(b);
// データ持ってくる


setCurrentGroup(root)