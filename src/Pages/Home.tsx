import { About } from "@/components/About"
import { HeroBanner } from "@/components/HeroBanner"
import { ProductCards } from "@/components/ProductCard"
import SearchBy from "@/components/SearchBy"
import { TestHero } from "@/components/testhearo"

export function Home() {
  return (
    <>
      {/* <HeroBanner />
      <ProductCards /> */}
      <TestHero />
      <div className=" justify-center w-1/3 items-center inline-block md:mt-20">
        <h1 className="ext-4xl font-bold tracking-tight text-white text-2xl md:text-5xl text-pretty">
          Some VR product you should knew
        </h1>
      </div>
      
      <ProductCards />
    </>
  )
}
