import "../styles/login.css";

import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      const role = response.data.user.role;

      if (role === "restaurant") {
        navigate("/restaurant/dashboard");
      }
      
      else if (role === "ngo") {
        navigate("/ngo/dashboard");
      }
      
      else if (role === "admin") {
        navigate("/admin");
      }

    } catch (error) {
  console.log(error);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Login failed"
  );
}
  };

  return (

    <div className="login-container">

      {/* BACKGROUND GLOW */}

      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="login-card">

        {/* LEFT PANEL */}

        <div className="login-left-panel">

          <div className="overlay"></div>

          <div className="login-content">

            <h1>
              Welcome <span>Back</span>
            </h1>

            <p>
              Continue your mission of reducing food waste
              and helping communities in need.
            </p>

            <div className="login-stats">

              <div className="login-stat-box">
                <h2>500+</h2>
                <span>Donations</span>
              </div>

              <div className="login-stat-box">
                <h2>120+</h2>
                <span>NGOs</span>
              </div>

              <div className="login-stat-box">
                <h2>10K+</h2>
                <span>Meals Saved</span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="login-right-panel">

          <h2>Login</h2>

          <p className="login-subtitle">
            Access your dashboard securely.
          </p>

          <form onSubmit={handleLogin}>

            <div className="login-input-box">

              <FaEnvelope className="login-icon" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="login-input-box">

              <FaLock className="login-icon" />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Login Now
            </button>

          </form>

          <p className="signup-text">

            Don&apos;t have an account?

            <Link to="/register">
              <span> Register</span>
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;