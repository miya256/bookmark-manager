import "./App.css"
import Content from "./Content";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;