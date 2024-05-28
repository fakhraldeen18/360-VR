import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function SearchBy() {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <form className="flex gap-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
        <Button variant="outline" type="submit" size="sm" className="h-10 -ml-2 text-center gap-1">
          <span className="">Search</span>
        </Button>
      </form>
    </div>
  )
}
