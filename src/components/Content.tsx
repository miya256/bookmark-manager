import { useContext } from "react";

import { TreeContext } from "../contexts/TreeContext";
import { NaviContext } from "../contexts/NaviContext";

import type { ItemData } from "../types/Item";

import Link from "./Link";
import Folder from "./Folder";
import "./Content.css";

type Props = {
  find: (root: ItemData, targetId: string) => ItemData | null;
};

function Content({find}: Props) {
  const treeContext = useContext(TreeContext);
  const naviContext = useContext(NaviContext)

  if (!treeContext) {
    throw new Error("useTreeContext must be used inside TreeProvider");
  }
  if (!naviContext) {
    throw new Error("useNaviContext must be used inside NaviProvider");
  }

  const { treeHistory, treeDispatch } = treeContext;
  const { naviHistory, naviDispatch } = naviContext;

  const currentFolder = find(treeHistory.present, naviHistory.present);
  if (currentFolder === null || currentFolder.type == "link") {
    throw new Error("Failed to load bookmark-tree");
  }

  return (
    <>
      <main>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => naviDispatch({type: "goBack"})}>←</button>
          <button onClick={() => naviDispatch({type: "goForward"})}>→</button>
          <span>{currentFolder.name}</span>
        </div>

        <hr />

        <div className="gallery">
          {currentFolder.children
            .filter((item) => item.type === "folder")
            .map((item) => (
              <Folder key={item.id} data={item}/>
            ))}
          {currentFolder.children
            .filter((item) => item.type === "link")
            .map((item) => (
              <Link key={item.id} data={item}/>
            ))}
        </div>
      </main>
    </>
  );
}

export default Content;