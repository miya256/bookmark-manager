import { createContext, useContext } from "react";

import type { History } from "../types/History";
import type { NaviAction } from "../types/NaviAction";

type NaviContextType = {
  naviHistory: History<string>;
  naviDispatch: React.Dispatch<NaviAction>;
};

export const NaviContext = createContext<NaviContextType | null>(null);

export const useNavi = () => {
  const context = useContext(NaviContext);

  if (!context) {
    throw new Error("useNaviContext must be used inside NaviProvider");
  }

  return context;
};