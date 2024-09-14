import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Suspense,lazy } from "react"
const Header = lazy(() => import("./layout/Header"));
//import Header from "./layout/Header"
const Home = lazy(() => import("./components/Home"));
const InDetail = lazy(() => import("./components/InDetail"));
const Search = lazy(() => import("./components/Search"));
const Category = lazy(() => import("./components/Category"));
const SelectedCategory = lazy(() => import("./components/SelectedCategory"));
const Auth = lazy(() => import("./components/Auth"));

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
