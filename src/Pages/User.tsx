import {
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { User } from "@/types/Index"
import { useQuery } from "@tanstack/react-query"
import { DeleteUser } from "@/components/DeleteUser"
import { EditUser } from "@/components/EditUser"
import { UpdateRole } from "@/components/UpdateRole"
import Header from "@/components/Header"

export function Customer() {
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
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: users, error } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getUsers
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
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="text-left">
                  <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {users?.map((user) => {
                      return (
                        <TableBody key={user.id} className="text-left">
                          <TableRow>
                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
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
                                    <EditUser user={user} />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <UpdateRole user={user} />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <DeleteUser user={user} />
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
