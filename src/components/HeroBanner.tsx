import React from 'react'
import HeroImage from "../assets/Images/HeroBanner.png"

export function HeroBanner() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 -mt-16">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Immerse Yourself in the Future of VR
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Experience the latest in virtual reality technology with our cutting-edge VR headset.
            Explore new worlds, play immersive games, and unlock the full potential of VR.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <button></button>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Buy Now
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
        <img
          alt="VR Headset"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-contain"
          height="550"
          src={HeroImage}
          width="550"
        />
      </div>
    </section>
  )
}
