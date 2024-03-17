import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Details from "./pages/Details"


function App() {
  // const [count, setCount] = useState(0)
  //url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
  return (

    <div className="min-h-screen py-6 bg-white text-xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<Details />} />
      </Routes>
    </div>

  )
}

export default App
