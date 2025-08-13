import "./App.css";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects/Projects";
import Forbidden from "./pages/Forbidden";
function App() {
  const location = useLocation();
  const showNavbar = ["/login", "/register", "/projects"].includes(location.pathname);
  return (<>
    {showNavbar || < Navbar/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/login" element={<Home />} />
      <Route path={import.meta.env.BASE_URL+"/*"} element={<Forbidden />} />
    

    </Routes>
    
  </>
  );
}

export default App;
