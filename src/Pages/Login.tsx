import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { decodeUser } from "@/lib/Utils"
import jwtDecode from "jwt-decode"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Login() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { handleStoreUser } = context

  const navigate = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleLogIn = async () => {
    try {
      const res = await api.post("/user/login", login)
      return res.data
    } catch (error) {
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleLogIn()
    if (token) {
      localStorage.setItem("token", token)
      const decode = jwtDecode(token)
      const decodedUserToken = decodeUser(decode)
      localStorage.setItem("decodedUserToken", JSON.stringify(decodedUserToken))

      handleStoreUser(decodedUserToken)
      navigate("/")
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLogin({
      ...login,
      [name]: value
    })
  }
  return (
    <div className=" flex flex-col justify-between">
      <></>
         <form  onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm lg:mt-72">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="mt-9">
          <div className="grid gap-4 text-left">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signUp" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form> 
    </div>

  )
}
