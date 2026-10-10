export type LinkData = {
  type: "link";
  id: string;
  name: string;
  parent: string | null;
  url: string;
};

export type FolderData = {
  type: "folder";
  id: string;
  name: string;
  parent: string | null;
  children: ItemData[];
};

export type ItemData = LinkData | FolderData;