import React from 'react'
import { Link } from 'react-router-dom'

export default function OurPartners() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 mt-10">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="ext-4xl font-bold tracking-tight text-white text-2xl md:text-5xl text-pretty">
            Our Partners
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            We collaborate with the best companies to bring you the highest quality products and
            services.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 items-stretch justify-center gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Link
            to="https://store.steampowered.com/"
            target="_blank"
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 hover:scale-105"
          >
            <img
              src="https://images.squarespace-cdn.com/content/v1/5f7735b48892cb5ed0957256/1608570395045-VTV9QFS3QPQ20Q76HUSU/SteamVR-logo-black.jpeg"
              width="140"
              height="70"
              alt="Partner 1 Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center hover:scale-105"
            />
          </Link>
          <Link
            to="https://www.sega.com/"
            target="_blank"
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 hover:scale-105"
          >
            <img
              src="https://www.north49decals.com/cdn/shop/products/segab_grande.jpg?v=1607640855"
              width="140"
              height="70"
              alt="Partner 2 Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </Link>
          <Link
            to="https://www.vive.com/us/"
            target="_blank"
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 hover:scale-105"
          >
            <img
              src="https://seeklogo.com/images/V/vive-wordmark-logo-91B4826B00-seeklogo.com.png"
              width="140"
              height="80"
              alt="Partner 3 Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </Link>
          <Link
            to="https://www.oculus.com/casting/"
            target="_blank"
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 hover:scale-105"
          >
            <img
              src="https://roadtovrlive-5ea0.kxcdn.com/wp-content/uploads/2017/05/oculus-logo-2.jpg"
              width="140"
              height="80"
              alt="Partner 4 Logo"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
