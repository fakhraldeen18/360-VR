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
import { Product } from "@/types"

export function DeleteProduct({
  product,
  handleDeleteProduct
}: {
  product: Product
  handleDeleteProduct: (id: string) => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product from the database?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue={product.name} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleDeleteProduct(product.id)}>Delete item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
