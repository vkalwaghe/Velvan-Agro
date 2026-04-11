import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";
import "./Auth.css";

export default function Auth() {

  // ✅ FIX: initialize navigate here
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  // 🔥 Form State
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    location: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // 🔄 Handle Input Change
  const handleSubmit = (e) => {
  e.preventDefault();

  if (isSignup) {
    alert("Signup disabled (demo mode)");
    return;
  }

  const result = loginUser(formData.email, formData.password);

  if (result.success) {
    alert("Login Successful ✅");

    localStorage.setItem("user", JSON.stringify(result.user));

    const redirectPath =
      localStorage.getItem("redirectAfterLogin") || "/home";

    localStorage.removeItem("redirectAfterLogin");

    navigate(redirectPath);
  } else {
    alert(result.message);
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
                  <input type="text" name="name" onChange={handleChange} required />
                  <label>Full Name</label>
                </div>

                <div className="agro-input">
                  <input type="tel" name="number" onChange={handleChange} required />
                  <label>Mobile Number</label>
                </div>

                <div className="agro-input">
                  <input type="text" name="location" onChange={handleChange} required />
                  <label>Location (Village/City)</label>
                </div>
              </>
            )}

            {/* COMMON */}
            <div className="agro-input">
              <input type="email" name="email" onChange={handleChange} required />
              <label>Email</label>
            </div>

            <div className="agro-input">
              <input type="password" name="password" onChange={handleChange} required />
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