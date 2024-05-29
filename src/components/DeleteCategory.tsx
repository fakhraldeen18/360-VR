import api from "@/api"
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
import { TypeCategory } from "@/types/Index"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteCategory({ category }: { category: TypeCategory }) {
  const queryClient = useQueryClient()

  const deleteCategory = async (id: string) => {
    try {
      const res = await api.delete(`/category/${id}`)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
    queryClient.invalidateQueries({ queryKey: ["category"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category from the database?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleDeleteCategory(category.id)}>
            Delete item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
