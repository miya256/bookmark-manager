import "./Sidebar.css"

function Sidebar() {
  return (
    <>
      <aside style={{ width: "160px", borderRight: "1px solid #cccccc" }}>
        <h2>Bookmarks</h2>

        <form>
          <input
            placeholder="URL"
            style={{ width: "100px" }}
          />
          <button type="submit">追加</button>
        </form>
      </aside>
    </>
  );
}

export default Sidebar