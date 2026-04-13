import { useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import PreLoader from "./components/PreLoader";
import SmoothScroll from "./components/SmoothScroll";
import MouseFollower from "./components/MouseFollower";
import { HeroSkeleton, CatalogueSkeleton } from "./components/Skeleton";

// Optimized: Route-based Code Splitting
const Home = lazy(() => import("./pages/Home/Home"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Catalogue = lazy(() => import("./pages/Catalogue/Catalogue"));
const Forbidden = lazy(() => import("./pages/Forbidden"));
const Certification = lazy(() => import("./pages/Certification"));
const Services = lazy(() => import("./pages/Services/Services"));

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

      <main className={`relative transition-opacity duration-1000 ${isLoading ? 'opacity-0 invisible fixed inset-0 overflow-hidden' : 'opacity-100 visible'}`}>
        <MouseFollower />
        <SmoothScroll>
            {showNavbar || <Navbar />}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Suspense fallback={<HeroSkeleton />}><Landing /></Suspense>} />
              <Route path="/home" element={<Suspense fallback={<HeroSkeleton />}><Home /></Suspense>} />
              <Route path="/about" element={<Suspense fallback={<HeroSkeleton />}><About /></Suspense>} />
              <Route path="/contact" element={<Suspense fallback={<HeroSkeleton />}><Contact /></Suspense>} />
              <Route path="/projects" element={<Suspense fallback={<CatalogueSkeleton />}><Projects /></Suspense>} />
              <Route path="/catalogue" element={<Suspense fallback={<CatalogueSkeleton />}><Catalogue /></Suspense>} />
              <Route path="/login" element={<Suspense fallback={<HeroSkeleton />}><Home /></Suspense>} />
              <Route path="/certification" element={<Suspense fallback={<HeroSkeleton />}><Certification /></Suspense>} />
              <Route path="/services" element={<Suspense fallback={<HeroSkeleton />}><Services /></Suspense>} />
              <Route path={import.meta.env.BASE_URL + "/*"} element={<Suspense fallback={<HeroSkeleton />}><Forbidden /></Suspense>} />
            </Routes>
        </SmoothScroll>
      </main>
    </>
  );
}

export default App;
