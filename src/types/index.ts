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
export type User = {
  id: string
  role: string
  name: string
  email: string
  phone: string
}
