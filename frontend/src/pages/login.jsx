import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials 😅");
    }
  };

  return (
    <div className="login-wrapper">

      {/* Floating Background Stickers */}
      <div className="sticker sticker1">🚀</div>
      <div className="sticker sticker2">📊</div>
      <div className="sticker sticker3">💼</div>
      <div className="sticker sticker4">✨</div>

      <div className="login-card">
        <h1>Welcome Back 👋</h1>
        <p>Login to your CRM Dashboard 📈</p>

        <input
          placeholder="📧 Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login → 🚀
        </button>
      </div>
    </div>
  );
}
