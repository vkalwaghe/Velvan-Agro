import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <nav className="site-header landing-navbar">

  {/* BRAND (same as layout) */}
  <div className="brand">
    <div className="brand__logo" aria-hidden="true">
      🌿
    </div>

    <div>
      <div className="brand__title">VELAVAN AGRO</div>
      <div className="brand__tagline">Since 1972 • Coimbatore</div>
    </div>
  </div>

  {/* ONLY AUTH BUTTON */}
<div className="landing-auth">
  <div className="dropdown">
    
    <button
      className="landing-login-btn"
      onClick={() => setOpenDropdown(!openDropdown)}
    >
      Login / Signup ⬇
    </button>

    {openDropdown && (
      <div className="dropdown-menu">
        <div onClick={() => navigate("/auth")}>
          👤 User 
        </div>
        <div onClick={() => navigate("/auth?admin=true")}>
          🛠 Admin 
        </div>
      </div>
    )}

  </div>
</div>
</nav>

      {/* HERO */}
      <section className="landing-hero">

        {/* LEFT */}
        <motion.div
          className="landing-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>
            Smart Farming <span>Made Modern</span>
          </h1>

          <p>
            Trusted since 1972 in Coimbatore. Delivering fertilizers,
            seeds & crop solutions with reliability.
          </p>

          <div className="landing-buttons">
            <button
              className="landing-primary-btn"
              onClick={() => navigate("/home")}
            >
              Explore Products
            </button>

            <button className="landing-secondary-btn">
              Learn More
            </button>
          </div>

          <div className="landing-stats">
            <div>
              <h3>🌱</h3>
              <p>Quality Products</p>
            </div>
            <div>
              <h3>⚡</h3>
              <p>Fast Delivery</p>
            </div>
            <div>
              <h3>🤝</h3>
              <p>Trusted Since 1972</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="landing-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="landing-card">
            <h3>🌾 Premium Fertilizers</h3>

            <p className="highlight">
              Boost crop yield with trusted agricultural solutions
            </p>

            <p>
              Supplying high-quality fertilizers, seeds, and crop protection
              products from leading brands like IFFCO, Coromandel & Yara.
            </p>

            <button
              className="landing-primary-btn"
              onClick={() => navigate("/products")}
            >
              View Products
            </button>
          </div>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div className="landing-divider"></div>

      {/* HOW */}
      <section className="landing-how">
        <h2>How We Help Farmers</h2>

        <div className="landing-how-container">
          <div className="landing-how-card">
            <h3>1️⃣ Choose</h3>
            <p>Select products based on your farming needs.</p>
          </div>

          <div className="landing-how-card">
            <h3>2️⃣ Order</h3>
            <p>Place orders easily with secure system.</p>
          </div>

          <div className="landing-how-card">
            <h3>3️⃣ Grow</h3>
            <p>Achieve better yield with quality solutions.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Grow Better With Velavan Agro</h2>
        <button
          className="landing-primary-btn"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </section>

      <footer className="landing-footer">
        © 2026 Velavan Agro Centre | Coimbatore
      </footer>
    </div>
  );
}