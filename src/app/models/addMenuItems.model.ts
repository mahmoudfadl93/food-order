export interface IAddMenuItem {
  itemsList: ItemsList[]
  userId: string
  menuId: string
}

export interface ItemsList {
  name: string
  price: number
  menuId: number
}
