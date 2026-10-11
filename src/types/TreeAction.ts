export type TreeAction =
  | { type: "undo"}
  | { type: "redo"}
  | { type: "add-link", targetId: string, url: string}
  | { type: "add-folder", targetId: string, name: string}
  | { type: "remove", targetId: string}
  | { type: "rename", targetId: string, name: string}