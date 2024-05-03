import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { About } from './pages/About.jsx'
import { Profile } from './pages/Profile.jsx'
import { Header } from './components/Header.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { CreateListing } from './pages/CreateListing.jsx'
import { UpdateListing } from './pages/UpdateListing.jsx'
import { Listing } from './pages/Listing.jsx'

const App = () => {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/publicacion/:id' element={<Listing />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/crear-publicacion' element={<CreateListing />} />
          <Route path='/editar-publicacion/:id' element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { App }