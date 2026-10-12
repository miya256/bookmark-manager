import { createContext, useContext } from "react";

import type { History } from "../types/History";
import type { TreeAction } from "../types/TreeAction";
import type { ItemData } from "../types/Item";

type TreeContextType = {
  treeHistory: History<ItemData>;
  treeDispatch: React.Dispatch<TreeAction>;
};

export const TreeContext = createContext<TreeContextType | null>(null);

export const useTree = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error("useTreeContext must be used inside TreeProvider");
  }

  return context;
};
