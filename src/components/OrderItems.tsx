import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import api from "@/api"
import { TypeOrderItem, TypeInventory, TypeOrder, TypeProduct } from "@/types/Index"
import { useQuery } from "@tanstack/react-query"
export function OrderItem({ order }: { order: TypeOrder }) {
  const getOrderItems = async () => {
    try {
      const res = await api.get("/orderitem")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }


  const { data: orderItems, error: orderItemsError } = useQuery<TypeOrderItem[]>({
    queryKey: ["orderItem"],
    queryFn: getOrderItems
  })

  const getProducts = async () => {
    try {
      const res = await api.get(`/product/search`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }


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


  const { data: inventories, error: InventoryError } = useQuery<TypeInventory[]>({
    queryKey: ["inventory"],
    queryFn: getInventories
  })

  const productWithCategories = inventories?.map((inventory) => {
    const product = products?.find((c) => c.id === inventory.productId)
    if (product)
      return {
        ...inventory,
        productId: product.name
      }
    return inventory
  })

  const findOrder = orderItems?.filter((forder) => forder.orderId == order.id)
  const total = findOrder?.reduce((acc, curr) => {
    return acc + curr.totalPrice
  }, 0)

  const orderItemsWithInventory = findOrder?.map((items) => {
    const inventory = productWithCategories?.find((invent) => invent.id === items.inventoryId)
    if (inventory)
      return {
        ...items,
        inventoryId: inventory.productId
      }
    return inventory
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Items
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Items</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

        <Table>
          <TableHeader className="text-left">
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>price</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-left">
            {orderItemsWithInventory?.map((item) => (
              <TableRow key={item?.id}>
                <TableCell className="font-medium">{item?.inventoryId}</TableCell>
                <TableCell>{item?.totalPrice}</TableCell>
                <TableCell>x{item?.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
