import { Button } from "@/components/ui/button"
import { MountainIcon } from "lucide-react"
import { Link } from "react-router-dom"
import Hero from "../assets/Images/Hero.jpg"
import { Nav } from "./Nav"

export function TestHero() {
  return (
    <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-origin-content bg-right h-screen" style={{}}>
      <section className="w-full">
        <div className="relative h-[80vh] min-h-[500px] max-h-[800px] overflow-hidden">
          {/* <img
            alt="Hero Image"
            className="h-full w-full object-cover object-center"
            height={1080}
            src={Hero}
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover"
            }}
            width={1920}
          /> */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Unleash Your Creativity with Our Powerful Platform
              </h1>
              <p className="text-lg text-gray-300 md:text-xl">
                Discover a world of endless possibilities as you build, deploy, and scale your web
                applications with ease.
              </p>
              <div className="mt-5 flex justify-center gap-4">
                <Button variant="default">Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
