import { setCurrentGroup, showMenu } from "./controller.js";

class Entry {
    constructor(name) {
        this.name = name
        this.timer;
    }

    setupContextMenu(div) {
        div.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            showMenu(e.pageX, e.pageY, this);
        });
        div.addEventListener("touchstart", (e) => {
            this.timer = setTimeout(() => {
                const touch = e.touches[0];
                showMenu(touch.pageX, touch.pageY, this);
            }, 500);
        });
        div.addEventListener("touchend", () => {
            clearTimeout(this.timer);
        });
    }

    toElement() {}
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

    toElement() {
        const div = document.createElement("div");
        div.className = "bookmarkEntry";

        div.innerHTML = `
            <img src="${this.getFavicon()}" />
            <div>${this.name}</div>
        `;

        div.addEventListener("click", () => {
            window.open(this.url, "_blank");
        });

        this.setupContextMenu(div);

        return div;
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
    remove(entry) {
        this.entries = this.entries.filter(e => e !== entry);
    }

    toElement() {
        const div = document.createElement("div");
        div.className = "bookmarkEntry";

        div.addEventListener("click", () => {
            setCurrentGroup(this);
        });

        this.setupContextMenu(div);

        return div;
    }
}