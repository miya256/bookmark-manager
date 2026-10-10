import { useState } from "react";

import type { ItemData } from "../types/Item";


export function useContextMenu() {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    item: ItemData | null;
  } | null>(null);

  const openContextMenu = (
    x: number,
    y: number,
    item: ItemData | null
  ) => {
    setContextMenu({ x, y, item });
  };

  return { contextMenu, setContextMenu, openContextMenu }
}

export default useContextMenu