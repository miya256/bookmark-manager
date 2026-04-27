const bookmarks = [
  { title: "AtCoder", url: "https://atcoder.jp" },
  { title: "Google", url: "https://google.com" },
];

function getFavicon(url) {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}`;
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  bookmarks.forEach(b => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${getFavicon(b.url)}" />
      <div>${b.title}</div>
    `;

    div.addEventListener("click", () => {
      window.open(b.url, "_blank");
    });

    list.appendChild(div);
  });
}

render();