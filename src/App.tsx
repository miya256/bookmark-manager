import { useEffect, useState } from "react";

import useNavi from "./hooks/useNavi";
import useTree from "./hooks/useTree";
import useContextMenu from "./hooks/useContextMenu";
import { NaviContext } from "./contexts/NaviContext";
import { TreeContext } from "./contexts/TreeContext";
import { ContextMenuContext } from "./contexts/ContextMenuContext";
import { EditingIdContext } from "./contexts/EditingIdContext";

import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import ContextMenu from "./components/ContextMenu";
import "./App.css";

function App() {
  // 状態
  const {
    history: treeHistory,
    dispatch: treeDispatch,
    find: find,
  } = useTree();
  const { history: naviHistory, dispatch: naviDispatch } = useNavi();
  const { contextMenu, setContextMenu, openContextMenu } = useContextMenu();
  const [editingId, setEditingId] = useState<string | null>(null);

  // イベント
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        treeDispatch({ type: "undo" });
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        treeDispatch({ type: "redo" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ContextMenuContext.Provider value={{ openContextMenu }}>
      <TreeContext.Provider value={{ treeHistory, treeDispatch }}>
        <NaviContext.Provider value={{ naviHistory, naviDispatch }}>
          <EditingIdContext.Provider value={{ editingId, setEditingId }}>
            <div
              style={{ display: "flex", minHeight: "100vh" }}
              onContextMenu={(e) => {
                e.preventDefault();
                openContextMenu(e.clientX, e.clientY, null);
              }}
            >
              <Sidebar />
              <Content find={find} />
            </div>
            {contextMenu && <ContextMenu {...contextMenu} />}
          </EditingIdContext.Provider>
        </NaviContext.Provider>
      </TreeContext.Provider>
    </ContextMenuContext.Provider>
  );
}

export default App;
