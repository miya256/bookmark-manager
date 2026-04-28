let history = [];

export const state = {
    displayGroup: null,
    selected: null
}

export function enterGroup(g) {
    if (state.displayGroup != null) history.push(state.displayGroup);
    state.displayGroup = g;
    state.displayGroup.render();
}

export function goBack() {
    if (history.length > 0) {
        state.displayGroup = history.pop();
        state.displayGroup.render();
    }
}