import React, { useContext, useState } from "react"
import { Navbar, Typography, IconButton, Collapse } from "@material-tailwind/react"
import logoImage from "../assets/Images/logo.png"
import { Link } from "react-router-dom"
import { GlobalContext } from "@/App"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"

export function Nav() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { state, handelDeleteItemFromCart } = context

  const [openNav, setOpenNav] = React.useState(false)
  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const [quantity, setQuantity] = useState(1)

  const handelDecreesQuantity = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/products" className="flex items-center">
          Product
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/dashboard" className="flex items-center">
          Profile
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="#" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="#" className="flex items-center">
          About
        </Link>
      </Typography>
    </ul>
  )

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 rounded-lg bg-background ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <img src={logoImage} alt="logo" className="w-12 h-12 rounded-full " />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <section className="hidden lg:inline-block">
            <Popover>
              <PopoverTrigger asChild className="  items-center ">
                <Link
                  className="relative p-2 hover:bg-slate-900 dark:hover:bg-gray-800 rounded-full"
                  to="#"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {state.cart.length == 0 ? null : (
                    <span className="absolute -top-2 -right-2 rounded-full bg-pink-500 opacity-75 text-white text-xs px-2 py-1">
                      {context?.state.cart.length}
                    </span>
                  )}
                </Link>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-90 p-4">
                {state.cart.length === 0 ? (
                  <p>No Items</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Your Cart</h3>
                      <Link className="text-sm font-medium hover:underline" to="#">
                        View Cart
                      </Link>
                    </div>
                    {state.cart.map((item) => (
                      <div key={item.inventoryId} className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            alt="Product Image"
                            className="rounded-md"
                            height={80}
                            src={item.image}
                            style={{
                              aspectRatio: "80/80",
                              objectFit: "cover"
                            }}
                            width={80}
                          />
                          <div className="flex-1 text-center">
                            <h4 className="font-small text-left text">{item.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              SR {item.price * quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" onClick={handelDecreesQuantity}>
                              <MinusIcon className="h-4 w-4" />
                            </Button>
                            <span>{quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              className="text-red-600"
                              size="icon"
                              variant="ghost"
                              onClick={() => handelDeleteItemFromCart(item.inventoryId)}
                            >
                              <TrashIcon className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-sm font-medium">$</p>
                    </div>
                    <Button className="w-full">Checkout</Button>
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/dashboard">
                <DropdownMenuItem>profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/login">
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </Link>
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

// <span className="flex absolute -mt-5 ml-4">
//   <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
//   <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// </span>
