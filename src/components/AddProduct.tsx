import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ChangeEvent, FormEvent, useState } from "react"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TypeCategory } from "@/types/Index"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
export default function AddProduct() {
  const queryClient = useQueryClient()
  const postProduct = async () => {
    try {
      const res = await api.post("/product", product)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getCategories = async () => {
    try {
      const res = await api.get("/category")
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: categories, error: cetError } = useQuery<TypeCategory[]>({
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
    await postProduct()

    queryClient.invalidateQueries({ queryKey: ["productNoneJoin"] })
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
    <Dialog>
      <DialogTrigger asChild>
        <span>Add Product</span>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle className=" text-center">Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="name">
                Product Name
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="Enter product name"
                type="text"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="description">
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Enter product description"
                rows={4}
                className="col-span-3 h-40rounded-lg"
                onChange={handleChangeTextArea}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="price">
                Image URL
              </Label>
              <Input
                name="image"
                id="image"
                placeholder="Enter product image"
                type="text"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className=" w-full grid grid-cols-4 items-center gap-4">
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
