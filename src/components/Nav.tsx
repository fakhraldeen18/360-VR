import React, { useContext } from "react"
import { Navbar, Typography, IconButton, Collapse } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, UserIcon } from "lucide-react"

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
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium opacity-80 transition-opacity hover:opacity-100"
      >
        <Link to="#" className="flex items-center">
          About
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
    <Navbar className="mx-auto max-w-screen-x2 px-4 py-2 lg:px-8 lg:py-4 border-0 shadow-none absolute top-0 z-10 flex-row justify-between mt-3 mb-28">
      <div className="container mx-auto flex items-center justify-between ">
        <Link to="/">
          <img src={logoImage} alt="logo" className="w-12 h-12 rounded-full " />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1 justify-end">
          <section className="hidden lg:inline-block">
            <Popover open={openCart} onOpenChange={setOpenCart}>
              <PopoverTrigger asChild className="  items-center ">
                {keys.length == 0 ? (
                  <Link className="pt-1 rounded-full hidden lg:inline-block" to="#">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </Link>
                ) : (
                  <Link className="pt-5 rounded-full hidden lg:inline-block" to="#">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span className="relative -top-10 -right-2 rounded-full bg-[#6d28d9e6] opacity-75 text-white text-xs px-2 py-1">
                      {keys.length}
                    </span>
                  </Link>
                )}
              </PopoverTrigger>
              <PopoverContent align="end" className="w-90 p-4">
                {state.cart.length === 0 ? (
                  <p>No Items</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Your Cart</h3>
                    </div>
                    {keys.map((key) => {
                      const products = groups[key]
                      const product = products[0]
                      const total = products.reduce((acc, curr) => {
                        return acc + curr.price
                      }, 0)
                      return (
                        <div key={product.inventoryId} className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              alt="Product Image"
                              className="rounded-md"
                              height={80}
                              src={product.image}
                              style={{
                                aspectRatio: "80/80",
                                objectFit: "cover"
                              }}
                              width={80}
                            />
                            <div className="flex-1 text-center">
                              <h4 className="font-small text-left text">{product.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">SR {total}</p>
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
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleAddCart(product)}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                className="text-red-600"
                                size="icon"
                                variant="ghost"
                                onClick={() => handelDeleteItemFromCart(product.inventoryId)}
                              >
                                <TrashIcon className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-sm font-medium">SR {total}</p>
                    </div>
                    <Button className="w-full" onClick={() => setOpenCart(false)}>
                      <Link className="w-full" to="/checkout">
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
              <Typography className="p-2  hover:bg-slate-900 dark:hover:bg-gray-800 rounded-full hidden lg:inline-block">
                <UserIcon className="h-6 w-6" />
                <span className="sr-only">Login</span>
              </Typography>
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
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Link className="flex items-center hover:text-gray-200 " to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Collapse>
    </Navbar>
  )
}
