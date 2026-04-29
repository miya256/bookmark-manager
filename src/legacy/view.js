// bookmark
export function render(group) {
    const list = document.getElementById("list");
    list.innerHTML = "";
    for(const entry of group.entries) {
        const e = entry.toElement();
        list.appendChild(e);
    }
}

// input
export function renderInputError(inputs, message, text) {
    for(const input of inputs) {
        input.classList.add("input-error");
    }
    message.textContent = text;
}

export function clearInputError(inputs, message) {
    for(const input of inputs) {
        input.classList.remove("input-error");
    }
    message.textContent = "";
}

export function clearInputs(inputs) {
    for(const input of inputs) {
        input.value = "";
    }
}


// menu
export function renderMenu(menu) {
    menu.style.display = "block";
}

export function hideMenu(menu) {
    menu.style.display = "none";
}