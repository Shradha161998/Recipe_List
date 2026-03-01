import { BrowserRouter,Link, Routes, Route } from "react-router-dom"
import Home from '../Home'
import About from "../About"
import Contact from "../Contact"
import './Navbar.css'

export default function Navbar() {
  return (
    <BrowserRouter>
      {/* <RecipeList/> */}
      <div style={{
        backgroundImage: 'url(/food.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}>
        <nav className="nav-style">
          <h1>Recipe Finder</h1>
          <ul className="ul-style">
            <li>
              <Link to="/" className="linkStyle">Home</Link>
            </li>
            <li>
              <Link to="/about" className="linkStyle">About</Link>
            </li>
            <li>
              <Link to="/contact" className="linkStyle">Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Routes>
          <Route path='/' element={<Home />}>Home</Route>
          <Route path='/about' element={<About />}>About</Route>
          <Route path="/contact" element={<Contact />}>Contact</Route>
          </Routes>
        </div>
      </div>

    </BrowserRouter>
  )
}
