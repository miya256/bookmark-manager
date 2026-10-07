import type { FolderData } from "../types/item";

function Folder({ data }: { data: FolderData }) {
  return (
    <div>
      {data.name}
    </div>
  );
}

export default Folder