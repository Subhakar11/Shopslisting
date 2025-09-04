
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      
      <Link to="/shops" className="brand">Shops & Products</Link>

      
      <div className="nav-links">
        {user ? (
          <>
            <span className="small">Hi, {user.name}</span>
            <Link to="/shops">All Shops</Link>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
