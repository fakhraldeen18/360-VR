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
import { useState } from "react"
import api from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "89db2e6f-f88e-426b-93b5-eb7491993e3d",
    image: "https://th.bing.com/th/id/OIP.hW1wbZPgDmiruil8i-MgbgHaDZ?rs=1&pid=ImgDetMain"
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    await postProduct()

    queryClient.invalidateQueries({ queryKey: ["product"] })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card x-chunk="dashboard-06-chunk-3">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
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
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="block mb-2 font-medium" htmlFor="price">
                  Price
                </Label>
                <Input
                  name="price"
                  id="price"
                  placeholder="Enter product price"
                  type="number"
                  onChange={handleChange}
                />
              </div>
              <div className=" w-full flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category" className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block mb-2 font-medium" htmlFor="image">
                  Product Image
                </Label>
                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="outline">
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-gray-500 text-sm">No image selected</p>
                </div>
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
