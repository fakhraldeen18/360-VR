import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { UploadIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChangeEvent, FormEvent, useState } from "react"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Category } from "@/types"
export default function AddProduct() {

  const queryClient = useQueryClient()
  const postProduct = async () => {
    try {
      const res = await api.post("/product", product)
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

  const { data: categories, error: cetError } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: getCategories
  })

  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
    image: ""
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("product:", product)
    await postProduct()

    queryClient.invalidateQueries({ queryKey: ["product"] })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setProduct({
      ...product,
      description: value
    })
  }

  const handleSelect = (value: string) => {
    setProduct({
     ...product,
      categoryId: value
    })
  }
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 text-left">
      <div className="max-w-2xl mx-auto">
        <Card x-chunk="dashboard-06-chunk-3">
          <CardHeader>
            <CardTitle className=" text-center">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1.5">
                <Label className="block mb-2 font-medium" htmlFor="name">
                  Product Name
                </Label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Enter product name"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="block mb-2 font-medium" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Enter product description"
                  rows={4}
                  onChange={handleChangeTextArea}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="block mb-2 font-medium" htmlFor="price">
                  Image URL
                </Label>
                <Input
                  name="image"
                  id="image"
                  placeholder="Enter product image"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className=" w-full flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={handleSelect}>
                  <SelectTrigger id="category" className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between ">
                <Button className="w-1/2 mr-5" type="submit">
                  Save Product
                </Button>
                <Button className="w-1/2" variant="outline" type="reset">
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
