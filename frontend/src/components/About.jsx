import "../styles/about.css";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";

function About() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark"
      ? "about-container dark"
      : "about-container light"
    }>

      <Navbar />

      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="about-card">

        <div className="top-section">

          <h1>
            About <span>Our Mission</span>
          </h1>

          <p>
            Our food waste reduction platform connects restaurants,
            donors, NGOs and volunteers to reduce food wastage and
            help people in need. We aim to create a smarter and more
            sustainable food donation ecosystem through technology.
          </p>

        </div>

        <div className="bottom-section">

          <div className="left-side">

            <h2>Why Choose Us?</h2>

            <div className="info-card">
              <h3>Reduce Food Waste</h3>

              <p>
                Prevent excess food from being wasted by connecting
                donors with NGOs quickly.
              </p>
              
            </div>

            <div className="info-card">
              <h3>Help Communities</h3>

              <p>
                Support needy people through efficient food collection
                and distribution.
              </p>
            </div>

            <div className="info-card">
              <h3>Smart Management</h3>

              <p>
                Manage donations, requests and deliveries using one
                centralized platform.
              </p>
            </div>

          </div>

          <div className="right-side">

            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
              alt="donation"
            />

            <img
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
              alt="ngo food distribution"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;