export type TypeProductInvent = {
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

export type TypeProduct = {
  id: string
  categoryId: string
  name: string
  description: string
  image: string
}

export type TypeCategory = {
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

export const ROLE = {
  Admin: "Admin",
  Customer: "Customer"
} as const

export type DecodedUser = {
  undefined: string
  emailaddress: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}

export type TypeInventory = {
  id: string
  productId: string
  price: number
  quantity: number
  color: string
  size: string
}
export type TypeOrderItem = {
  id: string
  inventoryId: string
  orderId: string
  quantity: number
  totalPrice: number
}
export type TypeOrder = {
  id: string
  userId: string
  date: string
  status: string
  orderItem: TypeOrderItem[]
}
