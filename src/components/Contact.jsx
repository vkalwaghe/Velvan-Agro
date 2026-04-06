import { useEffect, useState } from "react";
import { hasSupabaseConfig, supabase } from "../lib/supabaseClient";
import "./Contact.css";

const STORAGE_KEY = "velvanAgroContactMessages";

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [messages, setMessages] = useState(() => loadMessages());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) return;

    const entry = {
      name,
      email,
      message,
      submitted_at: new Date().toISOString(),
    };

    setSaving(true);

    try {
      if (hasSupabaseConfig()) {
        await supabase.from("contact_messages").insert([entry]);
      }

      const next = [{ id: Date.now(), ...entry }, ...messages];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setMessages(next);

      setName("");
      setEmail("");
      setMessage("");
      setSaved(true);
    } catch {
      setError("Failed to send message");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="z-contact">

      {/* LEFT HERO */}
      <div className="z-contact__left">
  <div className="overlay">

    <h1>Let’s Grow Together 🌱</h1>

    <p>
      From seeds to harvest, we support farmers with quality products,
      expert advice, and reliable service at every step.
    </p>

    {/* BADGES */}
    <div className="badges">
      <span>🌾 50+ Years Experience</span>
      <span>🚚 Fast Delivery</span>
      <span>🤝 Trusted by Farmers</span>
    </div>

    {/* NEW CONTACT INFO */}
    <div className="contact-extra">
      <p>📍 Karumathampatti</p>
      <p>📞 +91 98765 43210</p>
      <p>✉️ support@velavanagro.com</p>
      <p>⏰ Mon - Sat | 9 AM - 7 PM</p>
    </div>

  </div>
</div>

      {/* RIGHT FLOATING FORM */}
      <div className="z-contact__right">
        <form onSubmit={handleSubmit}>
          <h2>Get in Touch</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            required
          />

          <button disabled={saving}>
            {saving ? "Sending..." : "Send Message"}
          </button>

          {saved && <p className="success">✅ Sent successfully</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {/* FLOATING HISTORY */}
      {messages.length > 0 && (
        <div className="z-history">
          {messages.slice(0, 3).map((m) => (
            <div key={m.id} className="z-history-card">
              <strong>{m.name}</strong>
              <p>{m.message}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}