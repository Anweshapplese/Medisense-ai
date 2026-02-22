import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="disclaimer">
        ⚠️ <strong>MEDICAL DISCLAIMER:</strong> AI-generated insights are for
        informational purposes only. Always consult qualified healthcare
        professionals for medical decisions.
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <h3>MEDISENSE.AI</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.8' }}>
            Revolutionizing healthcare with artificial intelligence. Making
            medical information accessible to everyone.
          </p>
        </div>

        <div className="footer-section">
          <h3>PRODUCT</h3>
          <ul className="footer-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#">How It Works</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">API Access</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul className="footer-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Medical Centers</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>LEGAL</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">HIPAA Compliance</a>
            </li>
            <li>
              <a href="#">Security</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2026 MediSense AI. All rights reserved. Built for the future of
          healthcare.
        </p>
      </div>
    </footer>
  );
};

export default Footer;