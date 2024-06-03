import { useContext, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useSearchParams } from "react-router-dom"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { TypeCategory, TypeProductInvent } from "@/types/Index"
import { CardBody, Typography } from "@material-tailwind/react"
import { Button } from "./ui/button"
import { GlobalContext } from "@/App"
import { toast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"

export default function ProductCate() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { handleAddCart, handelDeleteItemFromCart } = context
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defaultSearch)

  const getCategories = async () => {
    try {
      const res = await api.get(`/category`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: categories } = useQuery<TypeCategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  const getProducts = async () => {
    try {
      const res = await api.get(`/product?search=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: products, error } = useQuery<TypeProductInvent[]>({
    queryKey: ["product"],
    queryFn: getProducts
  })
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  }

  const groups =
    products?.reduce((acc, obj) => {
      const key = obj.categoryId
      const curGroup = acc[key] ?? []
      return { ...acc, [key]: [...curGroup, obj] }
    }, {} as { [key: string]: TypeProductInvent[] }) || {}

  return (
    <div className="flex flex-col justify-between">
      <></>
      {Object.keys(groups).map((key) => {
        const products = groups[key]
        const category = categories?.find((c) => c.id === key)
        return (
          <Carousel key={key} className="w-full max-w-[1000px] mx-auto mt-40">
            <h1 className="flex justify-start mb-10 text-5xl underline decoration-[#6d28d9e6]">
              {category?.type}
            </h1>
            <CarouselContent className="-ml-1">
              {products?.map((product) => (
                <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card
                      key={product.inventoryId}
                      className=" w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
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
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )
      })}
    </div>
  )
}
