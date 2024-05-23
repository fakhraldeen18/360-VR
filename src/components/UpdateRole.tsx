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
import { ROLE, User } from "@/types/Index"
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

type handleSelect = (value: number) =>void
export function UpdateRole({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [updateUserRole, setUpdateUserRole] = useState({
    role:0
  })
  const updateUser = async () => {
    try {
      const res = await api.patch(`/user/updaterole/${user.id}`, updateUserRole)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleUpdate = async () => {
    console.log(updateUserRole)
    await updateUser()
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }

  const handleSelect = (value: string) => {
    setUpdateUserRole({
      ...updateUserRole,
      role: +value
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Update Role
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] md:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
          <DialogDescription>
            Are you sure changing user role? Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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
                  <SelectItem value={"1"}>admin</SelectItem>
                  <SelectItem value={"0"}>customer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate} variant="destructive">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
