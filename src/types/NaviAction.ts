export type NaviAction = 
  | { type: "goBack"}
  | { type: "goForward"}
  | { type: "open", id: string }