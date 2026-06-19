import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "../styles/navbar.css";

function Navbar() {

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

    window.location.reload();
  };

  return (

    <nav className="navbar">

      {/* LEFT */}

      <div className="nav-left">

        <div className="logo-circle">
          F
        </div>

        <h2>FeedForward</h2>

      </div>

      {/* CENTER */}

      <div className="nav-center">

        <Link to="/">Home</Link>

        <Link to="/how-it-works">
          How It Works
        </Link>

        <Link to="/about">
          About
        </Link>

        {token && role === "restaurant" && (
          <Link to="/restaurant/profile">
            Profile
        </Link>

        )}

        {token && role === "ngo" && (
          <Link to="/ngo/profile">
            Profile
        </Link>
)}

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {
            theme === "light"
              ? <FaMoon />
              : <FaSun />
          }
        </button>

        {!token ? (

          <>
            <Link
              to="/login"
              className="nav-login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="nav-register-btn"
            >
              Get Started
            </Link>
          </>

        ) : (

          <>

            {
              role === "restaurant" && (

                <Link
                  to="/restaurant/dashboard"
                  className="nav-login-btn"
                >
                  Dashboard
                </Link>

              )
            }

            {
              role === "ngo" && (

                <Link
                  to="/ngo/dashboard"
                  className="nav-login-btn"
                >
                  Dashboard
                </Link>

              )
            }

            <button
              onClick={handleLogout}
              className="nav-register-btn"
            >
              Logout
            </button>

          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;