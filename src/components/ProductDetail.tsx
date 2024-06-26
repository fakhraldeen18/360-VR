import api from "@/api"
import { TypeProductInvent } from "@/types/Index"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { Input } from "./ui/input"
import { Button } from "@/components/ui/button"
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion
} from "@/components/ui/accordion"
import { ApertureIcon, MinusIcon, PlusIcon, WeightIcon } from "lucide-react"
import { Label } from "./ui/label"
import { useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { CardBody, Typography } from "@material-tailwind/react"
import { ToastAction } from "./ui/toast"
import { toast } from "./ui/use-toast"

export default function ProductDetail() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { handleAddCart, handelDeleteItemFromCart } = context

  const params = useParams()

  const getProducts = async () => {
    try {
      const res = await api.get("/product")
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

  const [quantity, setQuantity] = useState(1)

  const handelDecreesQuantity = () => {
    if (quantity === 1) return
    setQuantity(quantity - 1)
  }

  const product = products?.find((p) => p.inventoryId === params.productID)
  if (!product) {
    return <div>product not found !!!</div>
  }

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  }

  const similarCategory = products?.filter(
    (productCategory) => productCategory.categoryId === product.categoryId
  )
  return (
    <>
      <div className="flex flex-col justify-between">
        <></>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 mt-20 md:mt-40">
          <div className="grid grid-cols-1 gap-4">
            <img
              alt="Product Image"
              className="aspect-video object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
              height={800}
              src={product.image}
              width={1200}
            />
          </div>
          <div className="grid gap-6 md:gap-10">
            <div className=" text-left">
              <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-3"> {product.description}</p>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-1xl" htmlFor="quantity">
                  Quantity
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Button
                    className="w-6 h-6 rounded-full"
                    size="icon"
                    variant="outline"
                    onClick={handelDecreesQuantity}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </Button>
                  <Input
                    className="w-16 text-center"
                    defaultValue="1"
                    value={quantity}
                    id="quantity"
                    max="10"
                    min="1"
                    type="number"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <Button
                    className="w-6 h-6 rounded-full"
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h3 className=" text-2xl font-bold">SR{product.price * quantity}</h3>
            </div>
            <Accordion collapsible type="single">
              <AccordionItem value="specs">
                <AccordionTrigger className="text-base font-medium">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div>
                      <div>
                        <WeightIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">Size</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{product.size}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <ApertureIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">Color</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{product.color}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex gap-4">
              <Button
                disabled={product.quantity === 0}
                size="lg"
                onClick={() => {
                  Array.from(Array(quantity).keys()).map((item) => {
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
                  })
                }}
              >
                {product.quantity > 0 ? "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="flex text-center text-5xl underline decoration-[#6d28d9e6]  md:ml-20 mt-20">
        Similar Products
      </h1>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10">
        {similarCategory?.map((product) => (
          <Card
            key={product.inventoryId}
            className="w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="h-30">
              <Link to={`/products/${product.inventoryId}`}>
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
    </>
  )
}
