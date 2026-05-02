import "./BookmarkList.css";
import Bookmark from "./Bookmark";

export default function BookmarkList({ bookmarks }: { bookmarks: { title: string; url: string; }[]}) {
  return (
    <div className="grid">
      {bookmarks.map((b:{title: string, url: string}) => (
        <Bookmark title={b.title} url={b.url} />
      ))}
    </div>
  );
}