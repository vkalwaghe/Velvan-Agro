import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation (replace with backend later)
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      alert("Admin Login Successful ✅");
      localStorage.setItem("role", "admin");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-card" onSubmit={handleSubmit}>
        <h2>🛠 Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}