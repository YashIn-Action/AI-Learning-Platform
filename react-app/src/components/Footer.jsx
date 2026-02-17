import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h4>Company</h4>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Careers</a>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Learnex. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
