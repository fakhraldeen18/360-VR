import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import api from "@/api"
import { ROLE, TypeOrder, TypeOrderItem, User } from "@/types/Index"
import { useQuery } from "@tanstack/react-query"
import Header from "@/components/Header"

export function Dashboard() {
  const getOrders = async () => {
    try {
      const res = await api.get("/order")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: orders, error } = useQuery<TypeOrder[]>({
    queryKey: ["order"],
    queryFn: getOrders
  })
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

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getUsers
  })
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
  const OrderItems = orders?.map((order) => {
    const FindOrderItem = orderItems?.filter((orderItem) => orderItem.orderId === order.id)
    if (FindOrderItem)
      return {
        ...order,
        orderItem: FindOrderItem
      }
    return order
  })
  console.log("OrderItems:", OrderItems)
  const ordersUsers = orders?.map((order) => {
    const user = users?.find((user) => user.id === order.userId)
    if (user)
      return {
        ...order,
        userId: user.name
      }
    return order
  })

  const total = orderItems?.reduce((acc, curr) => {
    return acc + curr.totalPrice
  }, 0)

  const customers = users?.filter((user)=> user.role == ROLE.Customer)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header/>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:ml-16">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SR{total}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{users?.length}</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{orderItems?.length}</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{customers?.length}</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Recent transactions from your store.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">Amount</TableHead>
                    <TableHead className="hidden xl:table-column">Amount</TableHead>
                    <TableHead className="hidden xl:table-column">Amount</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                {ordersUsers?.map((user) => {
                  const totalItems = orderItems?.filter((findOrder) => findOrder.orderId == user.id)
                  const amount = totalItems?.reduce((acc, curr) => {
                    return acc + curr.totalPrice
                  }, 0)
                  return (
                    <TableBody key={user.id} className=" text-left">
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">{user.userId}</div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">Sale</TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-23
                        </TableCell>
                        <TableCell className="text-right">SR{amount}</TableCell>
                      </TableRow>
                    </TableBody>
                  )
                })}
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            {users?.map((user) => {
              return (
                <CardContent key={user.id} className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 text-left">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              )
            })}
          </Card>
        </div>
      </main>
    </div>
  )
}
