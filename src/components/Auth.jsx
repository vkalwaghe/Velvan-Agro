import { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.css";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);

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

          <form>

            {/* SIGNUP EXTRA FIELDS */}
            {isSignup && (
              <>
                <div className="agro-input">
                  <input type="text" required />
                  <label>Full Name</label>
                </div>

                <div className="agro-input">
                  <input type="tel" required />
                  <label>Mobile Number</label>
                </div>

                <div className="agro-input">
                  <input type="text" required />
                  <label>Location (Village/City)</label>
                </div>
              </>
            )}

            {/* COMMON */}
            <div className="agro-input">
              <input type="email" required />
              <label>Email</label>
            </div>

            <div className="agro-input">
              <input type="password" required />
              <label>Password</label>
            </div>

            <button className="agro-btn">
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