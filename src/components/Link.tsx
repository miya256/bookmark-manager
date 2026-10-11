import { useState, useEffect } from "react";

import { useTree } from "../contexts/TreeContext";
import { useContextMenu } from "../contexts/ContextMenuContext";
import { useEditingId } from "../contexts/EditingIdContext";

import type { LinkData } from "../types/Item";

import "./Link.css";

function Link({ data }: { data: LinkData }) {
  const { openContextMenu } = useContextMenu();
  const { treeDispatch } = useTree();
  const { editingId, setEditingId } = useEditingId();
  const [name, setName] = useState<string>(data.name);

  // 名前が変わったら入力のところも変える
  useEffect(() => {
    setName(data.name);
  }, [data.name]);

  return (
    <div
      className="link-card"
      onClick={() => window.open(data.url)}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation(); // 親の画面全体右クリックが反応しないようにする
        openContextMenu(e.clientX, e.clientY, data);
      }}
    >
      <span className="link-icon">↗️</span>
      <img
        src={`https://www.google.com/s2/favicons?domain=${new URL(data.url).hostname}`}
      />
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

export default Link;
