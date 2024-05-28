import { About } from "@/components/About"
import { HeroBanner } from "@/components/HeroBanner"
import { ProductCards } from "@/components/ProductCard"
import { TestHero } from "@/components/testhearo"

export function Home() {
  return (
    <>
      {/* <HeroBanner />
      <ProductCards /> */}
      <TestHero />
      <ProductCards/>
    </>
  )
}
