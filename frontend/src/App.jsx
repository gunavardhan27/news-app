import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./components/Home"
import Header from "./layout/Header"
import { Suspense } from "react"
import InDetail from "./components/InDetail"
import Search from "./components/Search"
import Category from "./components/Category"
import SelectedCategory from "./components/SelectedCategory"
import Auth from "./components/Auth"

import ProtectedRoute from "./utils/ProtectedRoute"
function App() {
  let user=false
  if(localStorage){
    const key = JSON.parse(localStorage.getItem('user'))
    if(key){
      user=true
    }
  }
  return (
    <BrowserRouter>
    <Suspense fallback={<p>...loading</p>}>
    <Routes>
      <Route element={<ProtectedRoute user={user} />}>
      <Route path='/' element={<Home />} /> 
      <Route path='/:string' element={<InDetail />} />
      <Route path='/search' element={<Search />} />
      <Route path='/categories' element={<Category />} />
      <Route path='/category/:string' element={<SelectedCategory />} />
      </Route>
      <Route path='/login' element={<ProtectedRoute user={!user} redirect={'/'}><Auth /></ProtectedRoute> } />
     </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
