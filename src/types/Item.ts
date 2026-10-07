export type LinkData = {
  type: "link";
  id: string;
  name: string;
  url: string;
};

export type FolderData = {
  type: "folder";
  id: string;
  name: string;
  children: ItemData[];
};

export type ItemData = LinkData | FolderData;