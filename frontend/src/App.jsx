import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./components/Home"
import Header from "./layout/Header"
import { Suspense } from "react"
import InDetail from "./components/InDetail"
import Search from "./components/Search"
import Category from "./components/Category"
import SelectedCategory from "./components/SelectedCategory"


function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<p>...loading</p>}>
    <Routes>
      <Route path='/' element={<Home />} /> 
      <Route path='/:string' element={<InDetail />} />
      <Route path='/search' element={<Search />} />
      <Route path='/categories' element={<Category />} />
      <Route path='/category/:string' element={<SelectedCategory />} />
     </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
