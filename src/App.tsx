import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Footer } from "./components/Footer"
import { Nav } from "./components/Nav"
import { ProductCards } from "./components/ProductCard"
import ProductDetail from "./components/ProductDetail"

import "./App.css"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product, ROLE } from "./types/Index"
import { Dashboard } from "./components/Dashboard"
import { Login } from "./Pages/Login"
import { SignUp } from "./Pages/SignUp"
import PrivateRoute from "./context/PrivateRoute"
import { Overview } from "./Pages/Overview"
import DashNav from "./components/DashNav"
import { Order } from "./Pages/Order"
import { Customer } from "./Pages/User"
import { Category } from "./Pages/Category"
import { Inventory } from "./Pages/Inventory"

export type GlobalContextType = {
  state: GlobalState
  handleAddCart: (product: Product) => void
  handelDeleteItemFromCart: (inventoryId: string) => void
  handleDeleteOneFromCart: (inventoryId: string) => void
  handleRemoveCart: () => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void
}
export type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })

  useEffect(() => {
    const decodedUserToken = localStorage.getItem("decodedUserToken")
    if (decodedUserToken) {
      const decodedUser = JSON.parse(decodedUserToken)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleAddCart = (product: Product) => {
    // const isDuplicated = state.cart.find((item) => item.inventoryId === product.inventoryId)
    // if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handelDeleteItemFromCart = (inventoryId: string) => {
    const deleteItem = state.cart.filter((item) => item.inventoryId !== inventoryId)
    setState({
      ...state,
      cart: deleteItem
    })
  }
  const handleDeleteOneFromCart = (inventoryId: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.inventoryId === inventoryId)
    cart.splice(index, 1)
    setState({
      ...state,
      cart: cart
    })
  }
  const handleRemoveCart = () => {
    setState({
      ...state,
      cart: []
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    console.log("user:", user)
    setState({
      ...state,
      user: user
    })
  }
  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  console.log("state:", state)
  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          state,
          handleAddCart,
          handelDeleteItemFromCart,
          handleDeleteOneFromCart,
          handleRemoveCart,
          handleStoreUser,
          handleRemoveUser
        }}
      >
        {state.user?.role === ROLE.Customer || !state.user ? (
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductCards />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/products/:productID" element={<ProductDetail />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <DashNav />
            <Routes>
              <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/order" element={<Order />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/category" element={<Category />} />
              <Route path="/inventory" element={<Inventory />} />
            </Routes>
          </BrowserRouter>
        )}
      </GlobalContext.Provider>
    </div>
  )
}
export default App
