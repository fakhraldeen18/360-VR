import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function SignUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: ""
  })
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await handleSignUp()
    if (response) {
      navigate("/login")
    }
  }
  const handleSignUp = async () => {
    try {
      const res = await api.post("/user/signup", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  return (
    <div className=" flex flex-col justify-between">
      <></>
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm lg:mt-32">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="mt-9">
            <div className="grid gap-4 text-left">
              <div className="grid gap-2">
                <Label htmlFor="name">name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Max Robinson"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  name="phone"
                  id="phone"
                  type="number"
                  placeholder="966501234567"
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
                  required
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
