import { createContext, useContext } from "react";

import type { ItemData } from "../types/Item";


type ContextMenuContextType = {
  openContextMenu: (
    x: number,
    y: number,
    item: ItemData | null
  ) => void;
};

export const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);

  if (!context) {
    throw new Error(
      "useContextMenu must be used within ContextMenuContext.Provider"
    );
  }

  return context;
};
