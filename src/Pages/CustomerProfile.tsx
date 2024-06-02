import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import {  useContext } from "react"
import { GlobalContext } from "@/App"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { TypeOrder, TypeOrderItem, User } from "@/types/Index"
import { Typography } from "@material-tailwind/react"
import { EditProfile } from "@/components/EditProfile"

export function CustomerProfile() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { state } = context

  const token = localStorage.getItem("token")
  const getUsers = async () => {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: users, error } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getUsers
  })
  const findCustomer = users?.filter((user) => user.id == state.user?.nameidentifier)
  const getOrders = async () => {
    try {
      const res = await api.get("/order")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: orders, error: orderError } = useQuery<TypeOrder[]>({
    queryKey: ["order"],
    queryFn: getOrders
  })
  const getOrderFromUser = orders?.filter((order) => order.userId == state.user?.nameidentifier)

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

  return (
    <div className="flex flex-col justify-between">
      <></>
      <div className="flex flex-col md:grid md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6 mt-8 lg:mt-16">
        <div className=" dark:bg-gray-800 rounded-lg p-6 border -mr-9 md:-mr-0">
          {findCustomer?.map((customer) => {
            return (
              <div key={customer.id} className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage alt="Customer Avatar" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{customer.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h2 className="text-xl font-bold">{customer.name}</h2>
                  <div className="text-gray-500 dark:text-gray-400">{customer.email}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-left">
                  {getOrderFromUser?.map((order) => {
                    const totalItems = orderItems?.filter(
                      (findOrder) => findOrder.orderId == order.id
                    )
                    const amount = totalItems?.reduce((acc, curr) => {
                      return acc + curr.totalPrice
                    }, 0)
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Link className="font-medium" to="#">
                            #{order.id.slice(0, 5)}
                          </Link>
                        </TableCell>
                        <TableCell>{order.date.slice(0, 10)}</TableCell>
                        <TableCell>SR{amount}</TableCell>
                        <TableCell>
                          <Badge variant="default">{order.status}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {findCustomer?.map((customer) => {
            return (
              <Card key={customer.id}>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Typography className="border rounded-md p-2 text-left">
                        {customer.name}
                      </Typography>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Typography className="border rounded-md p-2 text-left">
                        {customer.email}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Typography className="border rounded-md p-2 text-left">
                      {customer.phone}
                    </Typography>
                  </div>
                </CardContent>
                <CardFooter>
                  <EditProfile user={customer} />
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
