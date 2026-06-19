import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">F</div>
          <div>
            <h3>FeedForward</h3>
            <p>Reducing food waste and delivering meals to communities in need.</p>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/how-it-works">How It Works</a>
            <a href="/impact">Impact</a>
            <a href="/dashboard">Dashboard</a>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <a href="/restaurant/upload">Upload Donation</a>
            <a href="/">Volunteer Guide</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <p><FaPhoneAlt /> +91 8374194785</p>
            <p><FaEnvelope /> support@feedforward.com</p>
            <p><FaMapMarkerAlt /> Hyderabad, Gachibowli, Telangana</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FeedForward. Made for community impact.</p>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/mohmmad-ruhulla-b1aa3b255/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
