import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { CardBody, Typography } from "@material-tailwind/react"
import { useQuery } from "@tanstack/react-query"

export function Home() {
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
  const { data, error } = useQuery<Product[]>({
    queryKey: ["product"],
    queryFn: getProducts
  })
  return (
    <>
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto  flex-wrap">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader className="h-80">
              <img
                src={product.image}
                alt={product.name}
                className=" h-full w-full object-cover rounded-lg"
              />
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="black" className="font-medium">
                  {product.size}
                </Typography>
                <Typography className="font-medium">SR {product.price}</Typography>
              </div>
              {/* <Typography
                variant="small"
                style={{ color: "gray" }}
                className="font-normal opacity-75"
              >
                {product.shortDesc}
              </Typography> */}
            </CardBody>
            <CardFooter>
              <Button className="w-full bg-[#701878]">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
