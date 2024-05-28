import React from "react"
import HeroImage from "../assets/Images/HeroBanner.png"
import Hero from "../assets/Images/Hero.jpg"
import { url } from "inspector"

export function HeroBanner() {
  return (
    // <section className="w-full py-12 md:py-24 lg:py-32 xl:py-45 -mt-16">
    //   <div className="container grid items-center gap-6 px-2 md:px-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
    //     <div className="space-y-4">
    //       <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mt-20 xl:text-6xl/none text-left">
    //         Immerse Yourself in the Future of Virtual Reality
    //       </h1>
    //       <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 text-left">
    //         Experience the latest in virtual reality technology with our cutting-edge VR headset.
    //         Explore new worlds, play immersive games, and unlock the full potential of VR.
    //       </p>
    //       <div className="flex flex-col gap-2 min-[400px]:flex-row">
    //         <a
    //           className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
    //           href="#"
    //         >
    //           Buy Now
    //         </a>
    //         <a
    //           className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-[#701878] px-8 text-sm font-medium shadow-sm
    //           transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none
    //           disabled:opacity-50
    //         dark:border-gray-800 dark:bg-gray-950
    //         dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
    //           href="#"
    //         >
    //           Learn More
    //         </a>
    //       </div>
    //     </div>
    //     <img
    //       alt="VR Headset"
    //       className="mx-auto aspect-square overflow-hidden rounded-xl object-contain hidden md:inline-block"
    //       height="550"
    //       src={HeroImage}
    //       width="550"
    //     />
    //   </div>
    // </section>

    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white  ">
      <div className="absolute inset-0 ">
        <img
        src={Hero}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Website</h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover amazing features and services that await you.
        </p>
        <a
          href="#"
          className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}
