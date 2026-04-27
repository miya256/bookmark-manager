import { enterGroup } from "./state.js";

class Entry {
    constructor(name) {
        this.name = name
    }
    render(list) {}
}

export class Bookmark extends Entry {
    constructor(name, url) {
        super(name);
        this.url = url;
    }

    getFavicon() {
        const domain = new URL(this.url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}`;
    }

    render(list) {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <img src="${this.getFavicon()}" />
            <div>${this.name}</div>
        `;

        div.addEventListener("click", () => {
            window.open(this.url, "_blank");
        });

        list.appendChild(div);
    }
}

export class Group extends Entry {
    constructor(name) {
        super(name);
        this.entries = [];
    }

    add(entry) {
        this.entries.push(entry);
    }

    render(list) {
        if (list === undefined) {
            list = document.getElementById("list");
            list.innerHTML = "";
            this.entries.forEach(e => e.render(list));
            return;
        }

        const div = document.createElement("div");
        div.className = "item";

        div.addEventListener("click", () => {
            enterGroup(this);
        });

        list.appendChild(div);
    }
}