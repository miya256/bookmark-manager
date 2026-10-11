export type LinkData = {
  type: "link";
  id: string;
  name: string;
  parent: string;
  url: string;
};

export type FolderData = {
  type: "folder";
  id: string;
  name: string;
  parent: string;
  children: ItemData[];
};

export type ItemData = LinkData | FolderData;