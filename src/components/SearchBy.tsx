import React from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function SearchBy() {
  return (
    <div className="relative w-full md:justify-center mx-auto mt-10 md:mt-20">
      <form className="flex justify-center gap-4">
        <Input
          type="search"
          placeholder="Search..."
          className="w-1/2 md:w-1/2 bg-background pl-8"
        />
        <Button type="submit" size="sm" className="h-10 -ml-2 text-center gap-1">
          <span className="">Search</span>
        </Button>
      </form>
    </div>
  )
}
