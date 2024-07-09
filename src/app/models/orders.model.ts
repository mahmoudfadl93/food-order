import { IMenus } from "./menus-data.model"

export interface IOrders {
  id: number
  menuId: string
  userId: number
  menu: IMenus
  timestamp: string
}


export interface IItemByUser {
  TotalPrice: number
  FullList: IFullList[]
}



export interface IOrderItems {
  OrderFullPrice: number
  OrderFullData: IOrderFullDaum[]
}

export interface IOrderFullDaum {
  TotalPrice: number
  User: string
  FullList: IFullList[]
}

export interface IFullList {
  ItemName: string
  Price: number
  Quantity: number
  TotalItemPrice: number
}
