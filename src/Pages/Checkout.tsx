import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CreditCardIcon, DollarSignIcon, MinusIcon, PlusIcon } from "lucide-react"
import { useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { TypeProductInvent } from "@/types/Index"
import api from "@/api"

type OrderItems = {
  productId: string
  quantity: number
  color: string
  size: string
}
type CheckoutOrder = OrderItems[]

export function Checkout() {
  const [payment, setPayment] = useState("")
  const handleChange = (value: string) => {
    setPayment(value)
  }
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const {
    state,
    handelDeleteItemFromCart,
    handleAddCart,
    handleDeleteOneFromCart,
    handleRemoveCart
  } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [key: string]: TypeProductInvent[] })
  const keys = Object.keys(groups)
  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  const checkoutOrder: CheckoutOrder = []
  keys.forEach((key) => {
    const products = groups[key]
    const product = products[0]
    checkoutOrder.push({
      productId: key,
      quantity: products.length,
      color: product.color,
      size: product.size
    })
  })

  const token = localStorage.getItem("token")
  const handleCheckout = async () => {
    try {
      const res = await api.post("/order", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) {
        handleRemoveCart()
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  return (
    <div className="flex flex-col justify-between">
      <></>
      <div className="grid md:grid-cols-[1fr_300px] gap-8 p-6 md:p-10 text-left mt-16 lg:mt-20">
        <div>
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" type="tel" />
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address1">Address 1</Label>
                  <Input id="address1" placeholder="Enter your address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address2">Address 2 (optional)</Label>
                  <Input id="address2" placeholder="Enter additional address details" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter your city" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter your state" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" placeholder="Enter your zip code" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <RadioGroup
                  onValueChange={handleChange}
                  className="grid grid-cols-2 gap-4"
                  defaultValue="card"
                >
                  <div>
                    <RadioGroupItem className="peer sr-only" id="card" value="card" />
                    <Label
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 x` p-4 hover:bg-gray-100 hover:text-gray-900    dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                      htmlFor="card"
                    >
                      <CreditCardIcon className="mb-3 h-6 w-6" />
                      Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem className="peer sr-only" id="cash" value="cash" />
                    <Label
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 x` p-4 hover:bg-gray-100 hover:text-gray-900    dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                      htmlFor="cash"
                    >
                      <DollarSignIcon className="mb-3 h-6 w-6" />
                      Cash
                    </Label>
                  </div>
                </RadioGroup>
                {payment == "" || payment == "card" ? (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="Enter your card number" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Select>
                            <SelectTrigger id="expiry-month">
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="01">01</SelectItem>
                              <SelectItem value="02">02</SelectItem>
                              <SelectItem value="03">03</SelectItem>
                              <SelectItem value="04">04</SelectItem>
                              <SelectItem value="05">05</SelectItem>
                              <SelectItem value="06">06</SelectItem>
                              <SelectItem value="07">07</SelectItem>
                              <SelectItem value="08">08</SelectItem>
                              <SelectItem value="09">09</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="11">11</SelectItem>
                              <SelectItem value="12">12</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger id="expiry-year">
                              <SelectValue placeholder="YYYY" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023">2023</SelectItem>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                              <SelectItem value="2027">2027</SelectItem>
                              <SelectItem value="2028">2028</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="CVC" />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </form>
            </CardContent>
          </Card>
          <div className="flex justify-start mt-4">
            <Button size="lg" onClick={handleCheckout} disabled={state.cart.length === 0}>
              Place Order
            </Button>
          </div>
        </div>
        <div>
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {keys.map((key) => {
                  const products = groups[key]
                  const product = products[0]
                  const total = products.reduce((acc, curr) => {
                    return acc + curr.price
                  }, 0)
                  return (
                    <div key={product.inventoryId} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Product Image"
                          className="rounded-md"
                          height={50}
                          src={product.image}
                          style={{
                            aspectRatio: "50/50",
                            objectFit: "cover"
                          }}
                          width={50}
                        />
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">SR{total}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteOneFromCart(product.inventoryId)}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span>{products.length}</span>
                        <Button size="icon" variant="ghost" onClick={() => handleAddCart(product)}>
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>SR{total}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>SR{total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>SR5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>SR8</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>SR{total + 5 + 8}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
