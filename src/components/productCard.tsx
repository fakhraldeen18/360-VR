import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from "@/types/Index"
import { CardBody, Typography } from "@material-tailwind/react"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"

export function ProductCards() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { handleAddCart, state } = context
  console.log("state:", state)

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
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: getProducts
  })
  return (
    <>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products?.map((product) => (
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
              <Button className="bg-background  outline  hover:bg-slate-600 outline-1">
                <Link to={`/products/${product.inventoryId}`}>Details</Link>
              </Button>
              <Button className=" bg-[#701878]" onClick={() => handleAddCart(product)}>
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
