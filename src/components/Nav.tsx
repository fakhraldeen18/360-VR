import React, { useContext } from "react"
import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import {
  Home,
  MinusIcon,
  Package,
  PanelLeft,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  Type,
  UserIcon
} from "lucide-react"

import { GlobalContext } from "@/App"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import logoImage from "../assets/Images/logo.png"
import { TypeProductInvent } from "@/types/Index"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { toast } from "./ui/use-toast"

type OrderItems = {
  productId: string
  quantity: number
  color: string
  size: string
}
type CheckoutOrder = OrderItems[]
export function Nav() {
  const [openNav, setOpenNav] = React.useState(false)
  const [openCart, setOpenCart] = React.useState(false)
  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const {
    state,
    handelDeleteItemFromCart,
    handleRemoveUser,
    handleAddCart,
    handleDeleteOneFromCart
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

  const handleLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("decodedUserToken")
    handleRemoveUser()
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium opacity-80 transition-opacity hover:opacity-100"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium opacity-80 transition-opacity hover:opacity-100"
      >
        <Link to="/productCate" className="flex items-center">
          Product
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium opacity-80 transition-opacity hover:opacity-100"
      >
        <Link to="/contactUs" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
    </ul>
  )
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
  return (
    <header className="top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto  sm:border-0 sm:bg-transparent sm:px-6 mt-5 text-end">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Typography className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base">
              <img src={logoImage} alt="logo" className="w-8 h-8 rounded-full " />
            </Typography>
            <Link
              to="/"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/productCate"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              to="/contactUs"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Type className="h-5 w-5" />
              Contact Us
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="container mx-auto flex items-center justify-end md:justify-between">
        <Link className=" hidden md:block" to="/">
          <img src={logoImage} alt="logo" className="w-12 h-12 rounded-full " />
        </Link>
        <section className="hidden md:block">{navList}</section>
        <div className="contents md:inline-block">
          <section className=" md:inline-block mr-5 ">
            <Popover open={openCart} onOpenChange={setOpenCart}>
              <PopoverTrigger asChild className="  items-center ">
                {keys.length == 0 ? (
                  <Link className="pt-1 rounded-full  lg:inline-block" to="#">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </Link>
                ) : (
                  <Link className="pt-1 rounded-full  lg:inline-block" to="#">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span className="absolute top-5 right-24 lg:right-28 rounded-full bg-[#6d28d9e6] opacity-75 text-white text-xs px-2 py-1">
                      {keys.length}
                    </span>
                  </Link>
                )}
              </PopoverTrigger>
              <PopoverContent align="end" className="w-90 p-4">
                {state.cart.length === 0 ? (
                  <p>No Items</p>
                ) : (
                  <div className="flex flex-col w-60 md:w-auto md:gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className=" text-sm md:text-lg font-medium">Your Cart</h3>
                    </div>
                    {keys.map((key) => {
                      const products = groups[key]
                      const product = products[0]
                      const total = products.reduce((acc, curr) => {
                        return acc + curr.price
                      }, 0)
                      return (
                        <div key={product.inventoryId} className="flex flex-col gap-1 md:gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              alt="Product Image"
                              className="rounded-md h-10 w-10 md:w-20 md:h-20"
                              src={product.image}
                              style={{
                                aspectRatio: "80/80",
                                objectFit: "cover"
                              }}
                            />
                            <div className="flex-1 text-center">
                              <h4 className="font-small text-left text-sm md:text-lg">
                                {product.name}
                              </h4>
                              <p className=" text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                SR {total}
                              </p>
                            </div>
                            <div className="flex text-center items-center justify-between md:gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteOneFromCart(product.inventoryId)}
                              >
                                <MinusIcon className="h-4 w-4" />
                              </Button>
                              <span>{products.length}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleAddCart(product)}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                className="hidden md:inline-block"
                                style={{ textAlign: "-webkit-center" }}
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  toast({
                                    variant: "destructive",
                                    title: "The product has been deleted"
                                  })
                                  handelDeleteItemFromCart(product.inventoryId)
                                }}
                              >
                                <TrashIcon className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="flex items-center justify-between">
                      <p className=" text-xs md:text-sm font-medium">Total</p>
                      <p className=" text-xs md:text-sm font-medium">SR {total}</p>
                    </div>
                    <Button className="w-full" onClick={() => setOpenCart(false)}>
                      <Link className="w-full" to={state.user ? "/checkout" : "/login"}>
                        Checkout
                      </Link>
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <UserIcon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!state.user ? (
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
              ) : (
                <DropdownMenuLabel>{state.user?.name}</DropdownMenuLabel>
              )}
              <DropdownMenuSeparator />
              <Link to="/customerProfile">
                <DropdownMenuItem>profile</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {!state.user ? (
                <>
                  <Link to="/signup">
                    <DropdownMenuItem>SignUp</DropdownMenuItem>
                  </Link>
                  <Link to="/login">
                    <DropdownMenuItem>LogIn</DropdownMenuItem>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
