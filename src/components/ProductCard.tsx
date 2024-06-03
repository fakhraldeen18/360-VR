import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TypeProductInvent } from "@/types/Index"
import { CardBody, Typography } from "@material-tailwind/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Input } from "./ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "./ui/toast"

export function ProductCards() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddCart, handelDeleteItemFromCart } = context
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""
  const [searchBy, setSearchBy] = useState(defaultSearch)
  const { toast } = useToast()
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["product"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }

  const getProducts = async () => {
    try {
      const res = await api.get(`/product?search=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<TypeProductInvent[]>({
    queryKey: ["product"],
    queryFn: getProducts
  })

  return (
    <>
      <div className="relative w-full md:justify-center mx-auto mt-10 md:mt-20">
        <form className="flex justify-center gap-4" onSubmit={handleSearch}>
          <Input
            name="searchBy"
            type="search"
            placeholder="Search..."
            className="w-1/2 md:w-1/2 bg-background pl-8"
            onChange={handleChange}
          />
          <Button type="submit" size="sm" className="h-10 -ml-2 text-center gap-1">
            <span className="">Search</span>
          </Button>
        </form>
      </div>

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-20">
        {products?.map((product) => (
          <Card
            key={product.inventoryId}
            className="w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="h-30">
              <Link onClick={scrollToTop} to={`/products/${product.inventoryId}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg"
                />
              </Link>
              <CardTitle className="text-lg font-bold text-white truncate block capitalize">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className=" flex items-center justify-between">
                <Typography className="text-lg font-semibold cursor-auto">
                  {product.size}
                </Typography>
                <Typography className="text-lg font-semibold cursor-auto">
                  SR {product.price}
                </Typography>
              </div>
            </CardBody>
            <CardFooter className=" justify-between">
              <Button className="  bg-slate-600 outline hover:bg-slate-600 text-white outline-1">
                <Link onClick={scrollToTop} to={`/products/${product.inventoryId}`}>
                  Details
                </Link>
              </Button>
              <Button
                disabled={product.quantity === 0}
                onClick={() => {
                  toast({
                    title: "The product successfully added to cart",
                    action: (
                      <ToastAction
                        onClick={() => handelDeleteItemFromCart(product.inventoryId)}
                        altText="Undo"
                      >
                        Undo
                      </ToastAction>
                    )
                  })
                  handleAddCart(product)
                }}
              >
                {product.quantity > 0 ? "Add to cart" : "Out of stock"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
