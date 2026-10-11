import { useEditingId } from "../contexts/EditingIdContext";
import { useTree } from "../contexts/TreeContext";

import type { ItemData } from "../types/Item";

import "./ContextMenu.css";

type Props = {
  x: number;
  y: number;
  item: ItemData | null;
};

function ContextMenu({x, y, item}: Props) {
  const { treeDispatch } = useTree();
  const { setEditingId } = useEditingId();

  return (
    <div className="context-menu" style={{left: x+"px", top: y+"px"}}>
      <div
        className="interactive-item"
      >
        新しいフォルダ
      </div>
      <div
        className={item ? "interactive-item" : "non-interactive-item"}
        onClick={item ? () => setEditingId(item.id) : undefined}
      >
        名前を変更
      </div>
      <div
        className={item ? "interactive-item" : "non-interactive-item"}
        onClick={item ? () => treeDispatch({type: "remove", targetId: item.id}) : undefined}
      >
        削除
      </div>
    </div>
  )
}

export default ContextMenu