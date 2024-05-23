import {
  Home,
  LineChart,
  MoreHorizontal,
  Package,
  PanelLeft,
  Search,
  ShoppingCart,
  UserIcon,
  Users2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import logoImage from "../assets/Images/logo.png"
import { Label } from "@/components/ui/label"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TypeCategory } from "@/types/Index"
import { ChangeEvent, FormEvent, useState } from "react"
import { EditCategory } from "@/components/EditCategory"
import { DeleteCategory } from "@/components/DeleteCategory"

export function Category() {
  const queryClient = useQueryClient()
  const [newCategory, setNewCategory] = useState({
    type: ""
  })
  const getCategories = async () => {
    try {
      const res = await api.get("/category")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const postCategory = async () => {
    try {
      const res = await api.post("/category", newCategory)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: categories, error: cetError } = useQuery<TypeCategory[]>({
    queryKey: ["category"],
    queryFn: getCategories
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await postCategory()
    queryClient.invalidateQueries({ queryKey: ["category"] })

    console.log("newCategory:", newCategory)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewCategory({
      ...newCategory,
      type: value
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </Link>
              <Link to="#" className="flex items-center gap-4 px-2.5 text-foreground">
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Customers
              </Link>
              <Link
                to="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="relative ml-auto flex-1 md:grow-0">
          <form className="flex gap-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
            <Button
              variant="outline"
              type="submit"
              size="sm"
              className="h-10 -ml-2 text-center gap-1"
            >
              <span className="">Search</span>
            </Button>
          </form>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <UserIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2 text-left">
                <CardTitle>Categories</CardTitle>
                <CardDescription>Recent transactions from your store.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {categories?.map((category) => {
                  return (
                    <TableBody key={category.id}>
                      <TableRow>
                        <TableCell className="font-medium text-left">{category.type}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <EditCategory category={category} />
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <DeleteCategory category={category} />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )
                })}
              </Table>
            </CardContent>
          </Card>
          <div>
            <Card x-chunk="dashboard-01-chunk-5">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Add new category</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Label className="block mb-2 font-medium" htmlFor="type">
                      Type
                    </Label>
                    <Input
                      name="type"
                      id="type"
                      placeholder="Enter type"
                      type="text"
                      className="col-span-3 h-40rounded-lg"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="w-1/2 mr-5" type="submit">
                      Save Category
                    </Button>
                    <Button className="w-1/2" variant="outline" type="reset">
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
