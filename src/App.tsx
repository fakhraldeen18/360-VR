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
    const isDuplicated = state.cart.find((item) => item.id === product.id)
    if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddCart }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductCards />} />
            <Route path="/products/:productID" element={<ProductDetail />} />
            <Route path="/products/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalContext.Provider>
    </div>
  )
}

export default App
