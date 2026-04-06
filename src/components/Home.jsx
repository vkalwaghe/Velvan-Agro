import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { companyInfo } from "../data/siteData";
import "./Home.css";

export default function Home() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Browse Products",
      desc: "Explore fertilizers, seeds & crop solutions tailored for your farm.",
    },
    {
      title: "Add to Cart",
      desc: "Select required items and place order in seconds.",
    },
    {
      title: "We Confirm",
      desc: "Our team connects with you for pricing & delivery.",
    },
    {
      title: "Better Yield 🌾",
      desc: "Grow more with trusted agricultural solutions.",
    },
  ];

  // 🔥 AUTO STEP ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const images = [
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30",
];

const [imageIndex, setImageIndex] = useState(0);

const features = [
  {
    name: "Fertilizers",
    icon: "🌾",
    img: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
    desc: "Boost soil fertility and improve crop productivity with high-quality fertilizers.",
  },
  {
    name: "Seeds",
    icon: "🌱",
    img: "https://images.unsplash.com/photo-1598514982841-3e1d5b5b8b5f",
    desc: "Premium quality seeds for better germination and higher yield.",
  },
  {
    name: "Pesticides & Fungicides",
    icon: "🛡️",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
    desc: "Protect crops from pests and diseases with effective solutions.",
  },
  {
    name: "Guidance",
    icon: "👨‍🌾",
    img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30",
    desc: "Expert field advice to help farmers take better decisions.",
  },
];
useEffect(() => {
  const slider = setInterval(() => {
    setImageIndex((prev) => (prev + 1) % images.length);
  }, 3000);

  return () => clearInterval(slider);
}, []);

  return (
    <section className="home">

      {/* 🔥 HERO */}
     {/* 🔥 HERO SPLIT */}
{/* 🔥 HERO CARDS */}
<div className="hero-wrapper">

  {/* LEFT CARD */}
  <div className="hero-card left">
    <div className="hero-content">
      <h1>
        Grow with <span>VELAVAN AGRO CENTRE</span>
      </h1>

      <p>
        Your trusted partner for fertilizers, crop protection, seeds & expert field support.
      </p>

      <div className="hero-buttons">
        <Link to="/home/products" className="btn-primary">
          View Products
        </Link>

        <Link to="/home/divisions" className="btn-secondary">
          Browse Divisions
        </Link>
      </div>

      <div className="hero-badges">
        <span>🌱 Since 1972</span>
        <span>📍 Karumathampatti</span>
        <span>🤝 Family Owned</span>
      </div>
    </div>
  </div>

  {/* RIGHT IMAGE CARD */}
  <div className="hero-card right">
    <img src={images[imageIndex]} alt="farm" />
  </div>

</div>



      {/* 🔥 WHY US (CARDS) */}
      <section className="why">
        <h2>Why Choose Us</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>🌱 Quality Products</h3>
            <p>Only trusted fertilizers & crop solutions from top brands.</p>
          </div>

          <div className="why-card">
            <h3>⚡ Fast Service</h3>
            <p>Quick order processing with reliable delivery support.</p>
          </div>

          <div className="why-card">
            <h3>🤝 Expert Guidance</h3>
            <p>Get advice from experienced agriculture professionals.</p>
          </div>
        </div>
      </section>

      {/* 🔥 UNIQUE FLOW TIMELINE */}

{/* 🔥 FLOW SECTION (FIXED) */}
<section className="flow-wrapper">

  {/* LEFT CARD - FLOW STYLE */}
{/* LEFT CARD - IMAGE + TEXT PREMIUM */}
<div className="flow-card left contact-left">

  <div className="contact-overlay">

    <h1>Let’s Grow Together 🌱</h1>

    <p>
      From seeds to harvest, we provide everything farmers need
      to achieve better yield and sustainable growth.
    </p>

    {/* HIGHLIGHTS */}
    <div className="contact-highlights">
      <span>🌾 50+ Years Experience</span>
      <span>🚚 Fast Support</span>
      <span>🤝 Trusted by Farmers</span>
    </div>

    {/* STATS */}
    <div className="contact-stats">
      <div>
        <h3>1000+</h3>
        <p>Farmers Served</p>
      </div>

      <div>
        <h3>Top Brands</h3>
        <p>IFFCO • YARA</p>
      </div>
    </div>

  </div>

</div>

  {/* RIGHT CARD */}
  <div className="flow-card right">
    <h2>Get Started in Minutes</h2>

    <div className="timeline">
      {steps.map((item, index) => (
        <div
          key={index}
          className={`timeline-step ${
            step === index ? "active" : ""
          } ${step > index ? "completed" : ""}`}
        >
          <div className="tick">
            {step > index ? "✔" : step === index ? "✓" : ""}
          </div>

          <div className="content">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}

      <div className="timeline-line">
        <div
          className="timeline-progress"
          style={{ height: `${(step + 1) * 25}%` }}
        />
      </div>
    </div>

    {step === steps.length - 1 && (
      <div className="final-success">
        <div className="big-tick">✔</div>
        <h3>You're Ready to Grow 🚀</h3>
      </div>
    )}
  </div>

</section>

      {/* 🔥 ACHIEVEMENT */}
      <section className="achievement">
        <div className="achievement-box">
          <h2>Trusted Since 1972</h2>
          <p>Serving generations of farmers with reliability & growth</p>

          <div className="numbers">
            <div>
              <h3>50+</h3>
              <p>Years Experience</p>
            </div>

            <div>
              <h3>1000+</h3>
              <p>Farmers Served</p>
            </div>

            <div>
              <h3>Top Brands</h3>
              <p>IFFCO • YARA • Coromandel</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CTA */}

    </section>
  );
}