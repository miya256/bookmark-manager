import { useState } from "react";

import { useTree } from "../contexts/TreeContext";
import { useNavi } from "../contexts/NaviContext";

import "./Sidebar.css";

function Sidebar() {
  const { treeHistory, treeDispatch } = useTree();
  const { naviHistory, naviDispatch } = useNavi();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error("URLが正しくありません");
      }

      setError("");

      treeDispatch({
        type: "add-link",
        targetId: naviHistory.present,
        url,
      });

      setUrl("");
    } catch {
      setError(url ? "URLが不正な形式です" : "URLを入力してください");
    }
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </aside>
    </>
  );
}

export default Sidebar;
