import "./App.css"
import { Home } from "./Pages/Home"
import { HeroBanner } from "./components/HeroBanner"
import { Nav } from "./components/Nav"

function App() {
  return (
    <div className="App">
      <Nav />
      <HeroBanner/>
      <Home />
    </div>
  )
}

export default App
