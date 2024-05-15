import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"
import { CardBody, Typography } from "@material-tailwind/react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export function ProductCards() {
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
      <h1 className="text-2xl uppercase mb-10 mt-5">Products</h1>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto  flex-wrap">
        {products?.map((product) => (
          <Card key={product.inventoryId} className="w-[350px]">
            <CardHeader className="h-30">
              <Link to={`/products/${product.inventoryId}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg"
                />
              </Link>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardBody>
              <div className=" flex items-center justify-between">
                <Typography color="black" className="font-medium">
                  {product.size}
                </Typography>
                <Typography className="font-medium">SR {product.price}</Typography>
              </div>
            </CardBody>
            <CardFooter className=" justify-between">
              <Button className="bg-background  outline  hover:bg-slate-600 outline-1">
                <Link to={`/products/${product.inventoryId}`}>Details</Link>
              </Button>
              <Button className=" bg-[#701878]">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
