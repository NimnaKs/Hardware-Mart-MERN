export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  image?: string
  features?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer"
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  shippingAddress: Address
}

export interface Address {
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
}

