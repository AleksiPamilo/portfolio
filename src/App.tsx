import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalContextProvider } from "./components/context/ModalContextProvider";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

const Home = lazy(() => import("./sites/Home"));
const Projects = lazy(() => import("./sites/Projects"));
const Project = lazy(() => import("./sites/Project"));
const Skills = lazy(() => import("./sites/Skills"));
const Spotify = lazy(() => import("./sites/Spotify"));
const NotFound = lazy(() => import("./components/NotFound"));
const Navigation = lazy(() => import("./components/Navigation"));

const App: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center fixed bg-opacity-60 z-50">
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
      </div>
    }>
      <HelmetProvider>
        <Router>
          <ModalContextProvider>
            <Navigation />
            <Toaster theme="dark" richColors />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<Project />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/spotify" element={<Spotify />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ModalContextProvider>
        </Router>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
