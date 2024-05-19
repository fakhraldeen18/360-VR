export type Product = {
  id: string
  inventoryId: string
  name: string
  image: string
  size: string
  price: number
  categoryId: string
  description: string
  color: string
  quantity: number
}

export type Category = {
  id: string
  type: string
}
