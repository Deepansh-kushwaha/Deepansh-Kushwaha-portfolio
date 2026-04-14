import { useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import PreLoader from "./components/PreLoader";
import SmoothScroll from "./components/SmoothScroll";
import MouseFollower from "./components/MouseFollower";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import { HeroSkeleton, CatalogueSkeleton } from "./components/Skeleton";

// Optimized: Route-based Code Splitting
const Home = lazy(() => import("./pages/Home/Home"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Catalogue = lazy(() => import("./pages/Catalogue/Catalogue"));
const CaseStudy = lazy(() => import("./pages/Catalogue/CaseStudy"));
const Studio = lazy(() => import("./pages/Studio"));
const Forbidden = lazy(() => import("./pages/Forbidden"));
const Certification = lazy(() => import("./pages/Certification"));
const Services = lazy(() => import("./pages/Services/Services"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const showNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <PreLoader key="loader" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className={`relative transition-opacity duration-1000 ${isLoading ? 'opacity-0 invisible fixed inset-0 overflow-hidden' : 'opacity-100 visible'}`}>
        <MouseFollower />
        <SmoothScroll>
            {showNavbar || <Navbar />}
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Landing /></Suspense></PageTransition>} />
                <Route path="/home" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Home /></Suspense></PageTransition>} />
                <Route path="/about" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><About /></Suspense></PageTransition>} />
                <Route path="/studio" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Studio /></Suspense></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Contact /></Suspense></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Suspense fallback={<CatalogueSkeleton />}><Projects /></Suspense></PageTransition>} />
                <Route path="/projects/:id" element={<PageTransition><Suspense fallback={<CatalogueSkeleton />}><CaseStudy /></Suspense></PageTransition>} />
                <Route path="/catalogue" element={<PageTransition><Suspense fallback={<CatalogueSkeleton />}><Catalogue /></Suspense></PageTransition>} />
                <Route path="/catalogue/:id" element={<PageTransition><Suspense fallback={<CatalogueSkeleton />}><CaseStudy /></Suspense></PageTransition>} />
                <Route path="/login" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Home /></Suspense></PageTransition>} />
                <Route path="/certification" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Certification /></Suspense></PageTransition>} />
                <Route path="/services" element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Services /></Suspense></PageTransition>} />
                <Route path={import.meta.env.BASE_URL + "/*"} element={<PageTransition><Suspense fallback={<HeroSkeleton />}><Forbidden /></Suspense></PageTransition>} />
              </Routes>
            </AnimatePresence>
        </SmoothScroll>
      </main>
    </>
  );
}

export default App;
