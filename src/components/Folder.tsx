import { useState, useEffect } from "react";

import { useNavi } from "../contexts/NaviContext";
import { useTree } from "../contexts/TreeContext";
import { useContextMenu } from "../contexts/ContextMenuContext";
import { useEditingId } from "../contexts/EditingIdContext";

import type { FolderData } from "../types/Item";

import "./Folder.css";

function Folder({ data }: { data: FolderData }) {
  const { openContextMenu } = useContextMenu();
  const { naviDispatch } = useNavi();
  const { treeDispatch } = useTree();
  const { editingId, setEditingId } = useEditingId();
  const [name, setName] = useState<string>(data.name);

  // 名前が変わったら入力のところも変える
  useEffect(() => {
    setName(data.name);
  }, [data.name]);

  return (
    <div
      className="folder-card"
      onClick={() => naviDispatch({ type: "open", id: data.id })}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation(); // 親の画面全体右クリックが反応しないようにする
        openContextMenu(e.clientX, e.clientY, data);
      }}
    >
      <span className="folder-icon">🗂️</span>
      <div>
        {data.id === editingId ? (
          <input
            style={{ width: "100px" }}
            value={name}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                treeDispatch({ type: "rename", targetId: data.id, name });
                setEditingId(null);
              }
            }}
          />
        ) : (
          data.name
        )}
      </div>
    </div>
  );
}

export default Folder;
