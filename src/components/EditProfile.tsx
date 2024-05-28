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
import {  User } from "@/types/Index"
import api from "@/api"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"

export function EditProfile({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [updatedCustomer, setUpdatedCustomer] = useState(user)
  const updateInventory = async () => {
    try {
      const res = await api.patch(`/user/${user.id}`, updatedCustomer)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedCustomer({
      ...updatedCustomer,
      [name]: value
    })
  }
  const handleUpdate = async (e:FormEvent) => {
    e.preventDefault()
    console.log(updatedCustomer)
    await updateInventory()
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[425px]">
        <form onSubmit={handleUpdate} className="gap-4 flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="block mb-2 font-medium" htmlFor="name">
              Name
            </Label>
            <Input
              name="name"
              id="name"
              type="text"
              className="col-span-3 h-40rounded-lg"
              onChange={handleChange}
              defaultValue={user.name}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="block mb-2 font-medium" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              type="email"
              className="col-span-3 h-40rounded-lg"
              onChange={handleChange}
              defaultValue={user.email}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="block mb-2 font-medium" htmlFor="phone">
              Phone
            </Label>
            <Input
              name="phone"
              id="phone"
              type="number"
              className="col-span-3 h-40rounded-lg"
              onChange={handleChange}
              defaultValue={user.phone}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
