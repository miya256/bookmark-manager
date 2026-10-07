import type { LinkData } from "../types/item";

function Link({ data }: { data: LinkData }) {
  return (
    <div>
      {data.name}
    </div>
  );
}

export default Link