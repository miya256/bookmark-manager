
import { useNavi } from "../contexts/NaviContext";
import { useContextMenu } from "../contexts/ContextMenuContext";

import type { FolderData } from "../types/Item";

import "./Folder.css";


function Folder({ data }: { data: FolderData }) {
  const { openContextMenu } = useContextMenu();
  const { naviHistory, naviDispatch } = useNavi();

  return (
    <div
      className="folder-card"
      onClick={() => naviDispatch({type: "open", id: data.id})}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation(); // 親の画面全体右クリックが反応しないようにする
        openContextMenu(e.clientX, e.clientY, data);
      }}
    >
      <span className="folder-icon">🗂️</span>
      <div>{data.name}</div>
    </div>
  );
}

export default Folder