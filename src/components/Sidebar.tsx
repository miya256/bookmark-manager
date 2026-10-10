import { useState } from "react";

import { useTree } from "../contexts/TreeContext";
import { useNavi } from "../contexts/NaviContext";

import "./Sidebar.css";


function Sidebar() {
  const { treeHistory, treeDispatch } = useTree();
  const { naviHistory, naviDispatch } = useNavi();
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    treeDispatch({
      type: "add-link",
      targetId: naviHistory.present,
      url,
    });

    setUrl("");
  }

  // 仮置き
  const [folderName, setFolderName] = useState("");
  function tmpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    treeDispatch({
      type: "add-folder",
      targetId: naviHistory.present,
      name: folderName,
    });

    setFolderName("");
  }

  return (
    <>
      <aside style={{ width: "160px", borderRight: "1px solid #cccccc" }}>
        <h2>Bookmarks</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            style={{ width: "100px" }}
          />
          <button type="submit">追加</button>
        </form>

        <form onSubmit={tmpSubmit}>
          <input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="フォルダ名（仮だよ）"
            style={{ width: "100px" }}
          />
          <button type="submit">追加</button>
        </form>
      </aside>
    </>
  );
}

export default Sidebar;