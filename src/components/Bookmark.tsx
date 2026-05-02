import "./Bookmark.css";

export default function Bookmark({ title, url }: {title: string, url: string}) {
  return (
    <div className="bookmark" onClick={() => window.open(url)}>
      <img src={`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`} />
      <div>{title}</div>
    </div>
  );
}