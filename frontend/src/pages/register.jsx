import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await API.post("/auth/register", { email, password });
    alert("User created successfully");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="card">
        <h1>Create Account</h1>
        <input placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
