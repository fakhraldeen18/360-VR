import {
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TypeCategory } from "@/types/Index"
import { ChangeEvent, FormEvent, useState } from "react"
import { EditCategory } from "@/components/EditCategory"
import { DeleteCategory } from "@/components/DeleteCategory"
import Header from "@/components/Header"

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
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:ml-16">
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
