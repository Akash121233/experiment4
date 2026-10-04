import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Events from "./pages/Events";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <b>TechFest 2026</b>
        <Link to="/">Events</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/my">My Registrations</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<MyRegistrations />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
