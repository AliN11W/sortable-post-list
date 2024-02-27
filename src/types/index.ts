export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PostType = {
  id: number;
  title: string;
};

export type ListOrderType = number[];

export type ListItemType = {
  id: number;
};

export type UpdatedListOrderDetails<T> = {
  movedItem: T;
  fromIndex: number;
  toIndex: number;
};

export type TimeTravelSnapshot = {
  id: string;
  text: string;
  order: ListOrderType;
};
