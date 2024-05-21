import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/home"
import { Footer } from "./components/footer"
import { Nav } from "./components/nav"
import { ProductCards } from "./components/productCard"
import ProductDetail from "./components/productDetail"

import "./App.css"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product, ROLE } from "./types"
import { Dashboard } from "./components/dashboard"
import { Login } from "./Pages/login"
import { SignUp } from "./Pages/signUp"
import PrivateRoute from "./context/privateRoute"

export type GlobalContextType = {
  state: GlobalState
  handleAddCart: (product: Product) => void
  handelDeleteItemFromCart: (inventoryId: string) => void
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
    const isDuplicated = state.cart.find((item) => item.inventoryId === product.inventoryId)
    if (isDuplicated) return

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
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        )}
      </GlobalContext.Provider>
    </div>
  )
}
export default App
