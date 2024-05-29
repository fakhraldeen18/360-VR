import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { TypeOrderItem, TypeOrder, User } from "@/types/Index"
import { OrderItem } from "@/components/OrderItems"
import Header from "@/components/Header"
import { useState } from "react"

type GroupedOrders = {
  [key: string]: TypeOrder[]
}

export function Order() {
  const [orderView, setOrderView] = useState("month")
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

  const fromThisWeek = orderItems?.reduce((acc, curr) => {
    return acc + curr.totalPrice
  }, 0) || 0

  function groupOrdersByDate(orders:TypeOrder[]) {
    const now = new Date()
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

    const groupedOrders: GroupedOrders = {
      week: [],
      month: [],
      year: []
    }

    orders?.forEach((order) => {
      const orderDate = new Date(order.date)

      if (orderDate > lastWeek) {
        groupedOrders["week"].push(order)
        groupedOrders["month"].push(order)
        groupedOrders["year"].push(order)
      } else if (orderDate > lastMonth) {
        groupedOrders["month"].push(order)
        groupedOrders["year"].push(order)
      } else if (orderDate > lastYear) {
        groupedOrders["year"].push(order)
      }
    })

    return groupedOrders
  }
  const ordersByView = groupOrdersByDate(orders || [])
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">SR{fromThisWeek / 30}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+25% from last week</div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">SR{fromThisWeek}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+10% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue={orderView} onValueChange={(value) => setOrderView(value)}>
              <div className="flex items-center ">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </div>
              {Object.keys(ordersByView).map((key) => (
                <TabsContent value={key} key={key}>
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>Recent orders from your store.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                            <TableHead className="text-left">Order Items</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        {ordersByView[orderView]?.map((order) => {
                          const user = users?.find((userName) => userName.id == order.userId)
                          const totalItems = orderItems?.filter(
                            (findOrder) => findOrder.orderId == order.id
                          )
                          const amount = totalItems?.reduce((acc, curr) => {
                            return acc + curr.totalPrice
                          }, 0)
                          return (
                            <TableBody key={order.id} className="text-left">
                              <TableRow className="bg-accent">
                                <TableCell>
                                  <div className="font-medium">{user?.name}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <Badge className="text-xs" variant="secondary">
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                                <TableCell className="text-left">
                                  <OrderItem order={order} />
                                </TableCell>
                                <TableCell className="text-right">{amount}</TableCell>
                              </TableRow>
                            </TableBody>
                          )
                        })}
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
