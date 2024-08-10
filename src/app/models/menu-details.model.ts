export interface IMenuDetails {
  Name: string;
  Items: Item[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  menuId: number;
  userId: number;
  active: number;
  timestamp: string;
}
