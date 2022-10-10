export type User = {
  authLevel: [number]
  password: string
  userName: string
  balance: number
  actingLevel: number
  hoursWorked: number
}

export type MenuItem = {
  name: string
  price: number
  created: string
  size: number
  ingredientsList: [string]
}

export type Ingredient = {
  name: string
  stock: number
  retailCost: number
  wholeSaleCost: number
  isMilk: boolean
  options: number
}

export type Order = {
  price: number
  time: string
  user: string
  orderStatus: "unfullfiled" | "fullfilled" | "canceled"
  ingredientsList: [string]
}
