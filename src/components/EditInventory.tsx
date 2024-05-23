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
import { TypeInventory } from "@/types/Index"
import api from "@/api"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditInventory({ inventory }: { inventory: TypeInventory }) {
  const queryClient = useQueryClient()
  const [updatedInventory, setUpdatedInventory] = useState(inventory)
  const updateInventory = async () => {
    try {
      const res = await api.patch(`/inventory/${inventory.id}`, updatedInventory)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target
    setUpdatedInventory({
      ...updatedInventory,
      [name]: name === "price" || name === "quantity" ? valueAsNumber : value
    })
  }

  const handleUpdate = async () => {
    console.log(updatedInventory)
    await updateInventory()
    queryClient.invalidateQueries({ queryKey: ["inventory"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Inventory</DialogTitle>
          <DialogDescription>
            Make changes to your inventory here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
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
            defaultValue={updatedInventory.price}
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
            defaultValue={updatedInventory.quantity}
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
            defaultValue={updatedInventory.color}
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
            defaultValue={updatedInventory.size}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
