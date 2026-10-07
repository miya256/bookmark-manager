import "./Content.css"

function Content() {
  return (
    <>
      <main>
        <div style={{ display: "flex", gap: "8px" }}>
          <button>←</button>
          <button>→</button>
          <span>directory</span>
        </div>

        <hr />

        <div className="gallery">

        </div>
      </main>
    </>
  );
}

export default Content;