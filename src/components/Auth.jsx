import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignup, setIsSignup] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  // 🔍 Detect admin login from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const admin = params.get("admin");

    if (admin === "true") {
      setIsAdminLogin(true);
    } else {
      setIsAdminLogin(false);
    }
  }, [location.search]);

  // 🔥 Form State
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    location: "",
    email: "",
    password: "",
  });

  // 🔄 Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Handle Submit (Fixed)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          isAdmin: isAdminLogin,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Signup
        if (isSignup) {
          alert("Registration Successful 🎉");
          setIsSignup(false);
          return;
        }

        // ✅ Login
        alert("Login Successful ✅");

        localStorage.setItem("user", JSON.stringify(data.user));

        if (isAdminLogin) {
          navigate("/admin/products");
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message || "Error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className={`agro-auth-wrapper ${isSignup ? "register" : "login"}`}>
      
      {/* TRIANGLE BG */}
      <div className="agro-triangle"></div>

      <div className="agro-content">
        <motion.div
          className="agro-card"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{isSignup ? "Create Account 🌱" : "Welcome Back 🌿"}</h2>

          <form onSubmit={handleSubmit}>

            {/* SIGNUP EXTRA FIELDS */}
            {isSignup && (
              <>
                <div className="agro-input">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                  <label>Full Name</label>
                </div>

                <div className="agro-input">
                  <input
                    type="tel"
                    name="number"
                    onChange={handleChange}
                    required
                  />
                  <label>Mobile Number</label>
                </div>

                <div className="agro-input">
                  <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    required
                  />
                  <label>Location (Village/City)</label>
                </div>
              </>
            )}

            {/* COMMON FIELDS */}
            <div className="agro-input">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="agro-input">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>

            <button className="agro-btn" type="submit">
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <p className="agro-switch">
            {isSignup ? "Already have an account?" : "New here?"}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Login" : " Sign up"}
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}