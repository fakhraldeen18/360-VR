import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Footer } from "./components/Footer"
import { Nav } from "./components/Nav"
import { ProductCards } from "./components/productCard"
import ProductDetail from "./components/ProductDetail"

import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCards />} />
          <Route path="/products/:productID" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
