import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { TypeInventory, TypeProduct } from "@/types/Index"
import AddInventory from "@/components/AddInventory"
import { DeleteInventory } from "@/components/DeleteInventory"
import { EditInventory } from "@/components/EditInventory"
import Header from "@/components/Header"

export function Inventory() {
  const getProducts = async () => {
    try {
      const res = await api.get(`/product/search`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<TypeProduct[]>({
    queryKey: ["productNoneJoin"],
    queryFn: getProducts
  })

  const getInventories = async () => {
    try {
      const res = await api.get("/inventory")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: inventories, error: InventoryError } = useQuery<TypeInventory[]>({
    queryKey: ["inventory"],
    queryFn: getInventories
  })

  const productWithInventories = inventories?.map((inventory) => {
    const product = products?.find((c) => c.id === inventory.productId)
    if (product)
      return {
        ...inventory,
        productId: product.name
      }
    return inventory
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header/>
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
                    <AddInventory />
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="text-left">
                  <CardTitle>Inventories</CardTitle>
                  <CardDescription>
                    Manage your inventories and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="hidden md:table-cell">Color</TableHead>
                        <TableHead className="hidden md:table-cell">Quantity</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {productWithInventories?.map((invent) => {
                      return (
                        <TableBody key={invent.id} className="text-left">
                          <TableRow>
                            <TableCell className="font-medium">{invent.productId}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{invent.size}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{invent.color}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {invent.quantity}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              SR {invent.price}
                            </TableCell>
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
                                    <EditInventory inventory={invent} />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <DeleteInventory inventory={invent} />
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
