import { Link } from "react-router-dom"
import "../css/Navbar.css"

function Navbar(){
  return(
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/Favourites" className="nav-link">Favourites</Link>
      </div>
    </nav>
  )
}

export default Navbar