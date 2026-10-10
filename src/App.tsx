import "./App.css"
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import useTree from "./hooks/useTree";
import useNavi from "./hooks/useNavi";
import { TreeContext } from "./contexts/TreeContext";
import { NaviContext } from "./contexts/NaviContext";

function App() {
  const { history: treeHistory, dispatch: treeDispatch, find: find} = useTree();
  const { history: naviHistory, dispatch: naviDispatch} = useNavi();

  return (
    <TreeContext.Provider value={{ treeHistory, treeDispatch }}>
      <NaviContext.Provider value={{ naviHistory, naviDispatch }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <Content find={find}/>
        </div>
      </NaviContext.Provider>
    </TreeContext.Provider>
  );
}

export default App;