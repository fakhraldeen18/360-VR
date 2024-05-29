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
import { User } from "@/types/Index"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteUser({ user }: { user: User }) {
  const queryClient = useQueryClient()

  const deleteUser = async (id: string) => {
    try {
      const res = await api.delete(`/user/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id)
    queryClient.invalidateQueries({ queryKey: ["user"] })
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
          <DialogTitle>Delete User ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this User from the database?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>
            Delete item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
