import React, { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import api from "@/api"

export default function SearchBy() {
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultSearch = searchParams.get("searchBy") || ""
    const [searchBy, setSearchBy] = useState(defaultSearch)
      const getProducts = async () => {
        try {
          const res = await api.get(`/product?search=${searchBy}`)
          return res.data
        } catch (error) {
          console.error(error)
          return Promise.reject(new Error("Something went wrong"))
        }
      }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setSearchBy(value)
    }
    const handleSearch = (e: FormEvent) => {
      e.preventDefault()
      queryClient.invalidateQueries({ queryKey: ["product"] })
      setSearchParams({
        ...searchParams,
        searchBy: searchBy
      })
    }
  return (
    <div className="relative w-full md:justify-center mx-auto mt-10 md:mt-20">
      <form onSubmit={handleSearch} className="flex justify-center gap-4">
        <Input
          type="search"
          placeholder="Search..."
          className="w-1/2 md:w-1/2 bg-background pl-8"
          onChange={handleChange}
        />
        <Button type="submit" size="sm" className="h-10 -ml-2 text-center gap-1">
          <span className="">Search</span>
        </Button>
      </form>
    </div>
  )
}
