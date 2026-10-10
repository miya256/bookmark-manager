import { useReducer } from "react";

import type { History } from "../types/History";
import type { NaviAction } from "../types/NaviAction";


function goBack(history: History<string>): History<string> {
  if (history.past.length === 0) return history;
  
  return {
    past: history.past.slice(0, -1),
    present: history.past[history.past.length - 1],
    future: [history.present, ...history.future],
  }
}

function goForward(history: History<string>): History<string> {
  if (history.future.length === 0) return history;

  return {
    past: [...history.past, history.present],
    present: history.future[0],
    future: history.future.slice(1),
  }
}

function open(history: History<string>, id: string): History<string> {
  return {
    past: [...history.past, history.present],
    present: id,
    future: [],
  }
}


function reducer(history: History<string>, action: NaviAction) {
  switch (action.type) {
    case "goBack":
      return goBack(history);
    case "goForward":
      return goForward(history);
    case "open":
      return open(history, action.id)
    default:
      return history
  }
}

export function useNavi() {
  const [history, dispatch] = useReducer(reducer, {
    past: [],
    present: "root",
    future: [],
  });

  return { history, dispatch }
}

export default useNavi