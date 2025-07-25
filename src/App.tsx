import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import About from "./pages/about";
import Contact from "./pages/contact";
function App() {
  return (<>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    

    </Routes>
    
  </>
  );
}

export default App;
