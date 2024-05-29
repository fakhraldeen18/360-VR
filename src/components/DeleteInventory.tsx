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
import { TypeInventory } from "@/types/Index"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteInventory({ inventory }: { inventory: TypeInventory }) {
  const queryClient = useQueryClient()

  const deleteInventory = async (id: string) => {
    try {
      const res = await api.delete(`/inventory/${id}`)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteInventory = async (id: string) => {
    await deleteInventory(id)
    queryClient.invalidateQueries({ queryKey: ["inventory"] })
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
          <DialogTitle>Delete Inventory ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this inventory from the database?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleDeleteInventory(inventory.id)}>
            Delete item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
