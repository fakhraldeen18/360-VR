import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
import { TypeProduct } from "@/types/Index"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
export default function AddInventory() {
  const queryClient = useQueryClient()

  const postInventory = async () => {
    try {
      const res = await api.post("/inventory", inventory)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getProducts = async () => {
    try {
      const res = await api.get(`/product/search`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<TypeProduct[]>({
    queryKey: ["productNoneJoin"],
    queryFn: getProducts
  })

  const [inventory, setInventory] = useState({
    productId: "",
    price: 0,
    quantity: 0,
    color: "",
    size: ""
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("inventory:", inventory)
    await postInventory()
    queryClient.invalidateQueries({ queryKey: ["inventory"] })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target
    setInventory({
      ...inventory,
      [name]: name === "quantity" || name === "price" ? valueAsNumber : value
    })
  }
  const handleSelect = (value: string) => {
    setInventory({
      ...inventory,
      productId: value
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>Add Inventory</span>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className=" text-center">Add New Inventory</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div className=" w-full grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product">Product</Label>
              <Select onValueChange={handleSelect}>
                <SelectTrigger id="product" className="w-[180px]">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Products</SelectLabel>
                    {products?.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="price">
                Price
              </Label>
              <Input
                name="price"
                id="price"
                placeholder="Enter price"
                type="number"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="quantity">
                Quantity
              </Label>
              <Input
                name="quantity"
                id="quantity"
                placeholder="Enter quantity"
                type="number"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="color">
                Color
              </Label>
              <Input
                name="color"
                id="color"
                placeholder="Enter color"
                type="text"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="block mb-2 font-medium" htmlFor="size">
                Size
              </Label>
              <Input
                name="size"
                id="size"
                placeholder="Enter size"
                type="text"
                className="col-span-3 h-40rounded-lg"
                onChange={handleChange}
              />
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
