import { useReducer } from "react";

import type { History } from "../types/History";
import type { TreeAction } from "../types/TreeAction";
import type { LinkData, FolderData, ItemData } from "../types/Item";


function save(root: ItemData) {
  localStorage.setItem(
    "bookmark-tree",
    JSON.stringify(root),
  );
}

function load(): FolderData {
  const raw = localStorage.getItem("bookmark-tree");
  if (!raw) {
    return {
      type: "folder",
      id: "root",
      name: "home",
      parent: "root",
      children: [],
    };
  }
  return JSON.parse(raw);
}

function undo(history: History<ItemData>): History<ItemData> {
  if (history.past.length === 0) return history;

  return {
    past: history.past.slice(0, -1),
    present: history.past[history.past.length - 1],
    future: [history.present, ...history.future],
  }
}

function redo(history: History<ItemData>): History<ItemData> {
  if (history.future.length === 0) return history;

  return {
    past: [...history.past, history.present],
    present: history.future[0],
    future: history.future.slice(1),
  }
}

function set(history: History<ItemData>, root: ItemData): History<ItemData> {
  return {
    past: [...history.past, history.present],
    present: root,
    future: [],
  }
}

function add(root: ItemData, targetId: string, data: ItemData): ItemData {
  if (root.type === "link") return root;

  if (root.id === targetId) {
    return {...root, children: [...root.children, data]}
  }

  let changed = false;
  const children: ItemData[] = [];
  for (const ch of root.children) {
    const node = add(ch, targetId, data)
    if (node !== ch) changed = true;
    children.push(node);
  }

  return changed ? {...root, children: children} : root;
}

function remove(root: ItemData, targetId: string): ItemData {
  if (root.type === "link") return root;

  let changed = false;
  const children: ItemData[] = [];
  for (const ch of root.children) {
    if (ch.id === targetId) {
      changed = true;
      continue;
    }

    const node = remove(ch, targetId);
    if (node !== ch) changed = true;
    children.push(node);
  }

  return changed ? {...root, children: children} : root;
}

function reducer(history: History<ItemData>, action: TreeAction) {
  let newHistory: History<ItemData>;
  let root: ItemData;

  switch (action.type) {
    case "undo":
      newHistory = undo(history);
      break;
    case "redo":
      newHistory = redo(history);
      break;
    case "add-link": {
      const node: LinkData = {
        type: "link",
        id: crypto.randomUUID(),
        name: new URL(action.url).hostname.replace(/^www\./, "").split(".")[0],
        parent: action.targetId,
        url: action.url,
      }
      root = add(history.present, action.targetId, node);
      newHistory = set(history, root);
      break;
    }
    case "add-folder": {
      const node: FolderData = {
        type: "folder",
        id: crypto.randomUUID(),
        name: action.name,
        parent: action.targetId,
        children: [],
      }
      root = add(history.present, action.targetId, node);
      newHistory = set(history, root);
      break;
    }
    case "remove": {
      root = remove(history.present, action.targetId);
      newHistory = set(history, root);
      break;
    }
    case "rename": {
      const node = find(history.present, action.targetId);
      if (node === null) throw new Error("Not found node in rename function");
      
      const newNode: ItemData = {...node};
      newNode.name = action.name;

      root = remove(history.present, action.targetId);
      root = add(root, newNode.parent, newNode);
      newHistory = set(history, root);
      break;
    }
    default:
      newHistory = history
  }
  save(newHistory.present);
  return newHistory;
}

function find(root: ItemData, targetId: string): ItemData | null{
  if (root.id === targetId) return root;

  if (root.type === "folder") {
    for (const ch of root.children) {
      const target = find(ch, targetId);
      if (target !== null) return target;
    }
  }
  return null;
}

export function useTree() {
  const root = load();

  const [history, dispatch] = useReducer(reducer, {
    past: [],
    present: root,
    future: []
  });

  return { history, dispatch, find };
}

export default useTree