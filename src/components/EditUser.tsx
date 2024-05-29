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
import { ChangeEvent, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

export function EditUser({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [updatedUser, setUpdatedUser] = useState(user)
  const updateUser = async () => {
    try {
      const res = await api.patch(`/user/${user.id}`, updatedUser)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedUser({
      ...updatedUser,
      [name]: value
    })
  }

  const handleUpdate = async () => {
    await updateUser()
    queryClient.invalidateQueries({ queryKey: ["user"] })
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your User here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              type="email"
              defaultValue={user.email}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              id="name"
              defaultValue={user.name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              name="phone"
              id="phone"
              defaultValue={user.phone}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>

          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Role
            </Label>
            <Select onValueChange={handleSelect}>
              <SelectTrigger id="category" className="w-[180px] col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup defaultValue={user.role}>
                  <SelectLabel>Role</SelectLabel>
                    <SelectItem value={ROLE.Admin}>
                      admin
                    </SelectItem>
                    <SelectItem value={ROLE.Customer}>
                      customer
                    </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
