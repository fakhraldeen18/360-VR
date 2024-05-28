import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router-dom"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TypeCategory, TypeProduct } from "@/types/Index"
import { DeleteProduct } from "../components/DeleteProduct"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { EditProduct } from "../components/EditProduct"
import { GlobalContext } from "@/App"
import AddProduct from "../components/AddProduct"
import Header from "../components/Header"
export function Product() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleRemoveUser, state } = context

  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  const [searchBy, setSearchBy] = useState(defaultSearch)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["productNoneJoin"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }
  const queryClient = useQueryClient()

  const getProducts = async () => {
    try {
      const res = await api.get(`/product/search?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getCategories = async () => {
    try {
      const res = await api.get("/category")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/product/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["productNoneJoin"] })
  }
  const handleLogOut = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("decodedUserToken")
    handleRemoveUser()
  }

  // Queries
  const { data: products, error } = useQuery<TypeProduct[]>({
    queryKey: ["productNoneJoin"],
    queryFn: getProducts
  })
  const { data: categories, error: cetError } = useQuery<TypeCategory[]>({
    queryKey: ["category"],
    queryFn: getCategories
  })

  const productWithCategories = products?.map((product) => {
    const category = categories?.find((c) => c.id === product.categoryId)
    if (category)
      return {
        ...product,
        categoryId: category.type
      }
    return product
  })
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>
                    <AddProduct />
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle className=" text-left">Products</CardTitle>
                  <CardDescription className=" text-left">
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className=" text-center">Name</TableHead>
                        <TableHead className=" text-center">Category</TableHead>
                        <TableHead className=" text-center">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productWithCategories?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={product.image}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.categoryId}</TableCell>
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
                                  <EditProduct product={product} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <DeleteProduct
                                    product={product}
                                    handleDeleteProduct={() => handleDeleteProduct(product.id)}
                                  />
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
