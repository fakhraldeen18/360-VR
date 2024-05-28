import { decodeUser } from "@/lib/Utils"
import { ROLE } from "@/types/Index"
import jwtDecode from "jwt-decode"
import { ReactElement } from "react"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token") || ""
  if (!token) {
    return <Navigate to="/" />
  }
  const decode = jwtDecode(token)
  const decodedUser = decodeUser(decode)
  return decodedUser.role === ROLE.Customer ? <Navigate to="/" /> : children
}
