import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="navbar">
      {isLoggedIn && <Link to="/home">Home</Link>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/register">Register</Link>}

      {isLoggedIn && <button onClick={onLogout}>Logout</button>}
    </div>
  );
};

export default Navbar;
