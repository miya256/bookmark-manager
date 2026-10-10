import { useContext } from "react";
import type { FolderData } from "../types/Item";;
import { NaviContext } from "../contexts/NaviContext";
import "./Folder.css"

function Folder({ data }: { data: FolderData }) {
  const naviContext = useContext(NaviContext)
  if (!naviContext) {
    throw new Error("useNaviContext must be used inside NaviProvider");
  }

  const { naviHistory, naviDispatch } = naviContext;

  return (
    <div
      className="folder-card"
      onClick={() => naviDispatch({type: "open", id: data.id})}
    >
      <span className="folder-icon">🗂️</span>
      <div>{data.name}</div>
    </div>
  );
}

export default Folder