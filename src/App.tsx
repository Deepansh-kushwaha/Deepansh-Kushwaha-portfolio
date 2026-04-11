import { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects/Projects";
import Forbidden from "./pages/Forbidden";
import Certification from "./pages/Certification";
import Landing from "./pages/Landing/Landing";
import PreLoader from "./components/PreLoader";
import SmoothScroll from "./components/SmoothScroll";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const showNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PreLoader key="loader" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          {showNavbar || <Navbar />}
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Home />} />
            <Route path="/certification" element={<Certification />} />
            <Route path={import.meta.env.BASE_URL + "/*"} element={<Forbidden />} />
          </Routes>
          </SmoothScroll>

      )}
    </>
  );
}

export default App;
