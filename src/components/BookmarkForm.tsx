import { useState } from 'react'

export default function BookmarkForm({add}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    add({ title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
      />
      <input 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="url"
      />
      <button type="submit">追加</button>
    </form>
  )
}