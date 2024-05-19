import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Footer } from "./components/footer"
import { Nav } from "./components/nav"
import { ProductCards } from "./components/productCard"
import ProductDetail from "./components/productDetail"

import "./App.css"
import { createContext, useState } from "react"
import { Product } from "./types"
import { Dashboard } from "./components/dashboard"

export type GlobalContextType = {
  state: GlobalState
  handleAddCart: (product: Product) => void
  handelDeleteItemFromCart: (inventoryId: string) => void
}
export type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

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
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddCart, handelDeleteItemFromCart }}>
        <BrowserRouter>
          {/* <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductCards />} />
            <Route path="/products/:productID" element={<ProductDetail />} />
          </Routes>
          <Footer /> */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </div>
  )
}
export default App
