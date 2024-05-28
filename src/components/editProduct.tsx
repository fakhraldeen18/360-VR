import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypeCategory, TypeProduct } from "@/types/Index"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditProduct({ product }: { product: TypeProduct }) {
  const queryClient = useQueryClient()
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const updateProduct = async () => {
    try {
      const res = await api.patch(`/product/${product.id}`, updatedProduct)
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
  const { data: categories, error: cetError } = useQuery<TypeCategory[]>({
    queryKey: ["category"],
    queryFn: getCategories
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value
    })
  }
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setUpdatedProduct({
      ...updatedProduct,
      description: value
    })
  }

  const handleSelect = (value: string) => {
    setUpdatedProduct({
      ...updatedProduct,
      categoryId: value
    })
  }
  const handleUpdate = async () => {
    console.log(updatedProduct)
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["product"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              name="name"
              id="name"
              defaultValue={product.name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className=" grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea
              name="description"
              id="description"
              defaultValue={product.description}
              className="col-span-3 h-40 text-black rounded-lg"
              onChange={handleChangeTextArea}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Product Image
            </Label>
            <Input
              name="image"
              id="name"
              defaultValue={product.image}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={handleSelect}>
              <SelectTrigger id="category" className="w-[180px] col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup defaultValue={updatedProduct.categoryId}>
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
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
