import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://loccalhost:5000/api";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(API + "/auth/login",
        { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setMessage("Welcome " + res.data.name);
    } catch (err) {
      if (err.response) setMessage(err.response.data.message);
      else setMessage("Server not reachable");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;
