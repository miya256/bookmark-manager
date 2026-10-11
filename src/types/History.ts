export type History<T> = {
  past: T[];
  present: T;
  future: T[];
};
