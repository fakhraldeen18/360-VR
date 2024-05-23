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
import { TypeCategory } from "@/types/Index"
import api from "@/api"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditCategory({ category }: { category: TypeCategory }) {
  const queryClient = useQueryClient()
  const [updatedCategory, setUpdatedCategory] = useState(category)
  const updateCategory = async () => {
    try {
      const res = await api.patch(`/category/${category.id}`, updatedCategory)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setUpdatedCategory({
      ...updatedCategory,
     type: value
    })
  }

  const handleUpdate = async () => {
    await updateCategory()
    queryClient.invalidateQueries({ queryKey: ["category"] })
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
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
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
            defaultValue={updatedCategory.type}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}