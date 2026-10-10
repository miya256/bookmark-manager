import { useContextMenu } from "../contexts/ContextMenuContext";

import type { LinkData } from "../types/Item";

import "./Link.css";

function Link({ data }: { data: LinkData }) {
  const { openContextMenu } = useContextMenu();
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
      <img src={`https://www.google.com/s2/favicons?domain=${new URL(data.url).hostname}`} />
      <div>{data.name}</div>
    </div>
  );
}

export default Link