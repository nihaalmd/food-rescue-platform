import "../styles/register.css";

import {
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (

    <div className="main-container">

      {/* BACKGROUND GLOW */}

      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="glass-card">

        {/* LEFT PANEL */}

        <div className="left-panel">

          <div className="overlay"></div>

          <div className="content">

            <h1>
              Food <span>Reduction</span> App
            </h1>

            <p>
              Connecting donors, restaurants, and NGOs
              to reduce food waste and help communities.
            </p>

            <div className="stats">

              <div className="stat-box">
                <h2>500+</h2>
                <span>Donations</span>
              </div>

              <div className="stat-box">
                <h2>120+</h2>
                <span>NGOs</span>
              </div>

              <div className="stat-box">
                <h2>10K+</h2>
                <span>Meals Saved</span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="right-panel">

          <h2>Create Account</h2>

          <p className="subtitle">
            Join the mission to reduce food waste.
          </p>

          <form onSubmit={handleRegister}>

            <div className="input-box">

              <FaUser className="icon" />

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

            <div className="input-box">

              <FaEnvelope className="icon" />

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

            <div className="input-box">

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                required
              >

                <option value="">
                  Select User Type
                </option>

                <option value="restaurant">
                  Restaurant
                </option>

                <option value="ngo">
                  NGO
                </option>

              </select>

            </div>

            <div className="input-box">

              <FaLock className="icon" />

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

            <div className="input-box">

              <FaLock className="icon" />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Register Now
            </button>

          </form>

          <p className="login-text">

            Already have an account?

            <Link to="/login">
              <span> Login</span>
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;