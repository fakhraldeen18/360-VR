import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import {
  Home,
  Package,
  PanelLeft,
  ShoppingCart,
  Type,
  UserIcon,
  Users2,
  Warehouse
} from "lucide-react"
import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import logoImage from "../assets/Images/logo.png"
import SearchBy from "./SearchBy"
import { useContext } from "react"
import { GlobalContext } from "@/App"

export default function Header() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleRemoveUser,state } = context

  const handleLogOut = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("decodedUserToken")
    handleRemoveUser()
  }
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto  sm:border-0 sm:bg-transparent sm:px-6 mt-5">
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
              Dashboard
            </Link>
            <Link
              to="/order"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              to="/inventory"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Warehouse className="h-5 w-5" />
              Inventories
            </Link>
            <Link
              to="/product"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              to="/category"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Type className="h-5 w-5" />
              Categories
            </Link>
            <Link
              to="/customer"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <UserIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{state.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
