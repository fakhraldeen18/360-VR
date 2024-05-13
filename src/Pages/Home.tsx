import api from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function Home  (){
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
        <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
          {data?.map((product) => (
            <Card key={product.id} className="w-[250px]">
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.name}
                  className=" md:w-40 md:h-full rounded-lg mx-auto"
                />
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content Here</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </section>
        {error && <p className="text-red-500">{error.message}</p>}
      </>
    )
}