import { DecodedUser } from "@/types/Index"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}

export function decodeUser(user: unknown) {
  const decodedUser: any = {}
  let userKey = ""
  if (user) {
    for (const [key, value] of Object.entries(user)) {
      userKey = key.split("identity/claims/")[1]
      decodedUser[userKey] = value
    }
  }
  return decodedUser
}
