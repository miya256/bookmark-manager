let history = [];
let now;

export function enterGroup(g) {
    if (now != undefined) history.push(now);
    now = g;
    now.render();
}

export function goBack() {
    if (history.length > 0) {
        now = history.pop();
        now.render();
    }
}