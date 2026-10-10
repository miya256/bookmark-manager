import type { LinkData } from "../types/Item";

import "./Link.css"

function Link({ data }: { data: LinkData }) {
  return (
    <div
      className="link-card"
      onClick={() => window.open(data.url)}
    >
      <span className="link-icon">↗️</span>
      <img src={`https://www.google.com/s2/favicons?domain=${new URL(data.url).hostname}`} />
      <div>{data.name}</div>
    </div>
  );
}

export default Link