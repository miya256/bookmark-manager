import { useState } from 'react'
import './App.css'

import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from './components/BookmarkList';

function App() {
  const [ bookmarks, setBookmarks] = useState([{title: "atcoder", url: "https://atcoder.jp/?lang=ja"}]);

  const addBookmark = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  return (
    <>
      <h1>Bookmark Manager</h1>
      <BookmarkForm add={addBookmark}/>
      <hr />
      <BookmarkList bookmarks={bookmarks}/>
    </>
  )
}

export default App
