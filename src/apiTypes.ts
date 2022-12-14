export type User = {
  readonly id: number
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
  ingredientList: ingredientList
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
  readonly id: number
  price: number
  created: string
  user: number
  orderStatus: "unfullfiled" | "fullfilled" | "canceled"
  ingredientList: ingredientList
}

type ingredientList = {
  baseItem: string
  ingredients: [string]
}
/*  example usage
const exampleOrder: Order = {
created: 2022-09-12T04:37:28.004073Z,
price: 200,
user: someUserInstance.id,
orderStatus: "unfullfiled",
ingredientsList: {
  baseItem: "some item from the menu",
  ingredients: ["ingred1", "ingred2"]
}
}

sidenote: dont worry too much about the date format
I will make a utility to convery js date objects into
the api format and vis versa
*/
