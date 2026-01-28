import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"; // Changed to HashRouter
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import useAuth
import { Navigation } from "./components/Navigation";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Repositories from "./pages/Repositories";
import RepositoryDetail from "./pages/RepositoryDetail";
import Thoughts from "./pages/Thoughts";
import ThoughtDetail from "./pages/ThoughtDetail";
import LegalPageDetail from "./pages/LegalPageDetail";
import Auth from "./pages/Auth";
import PasswordReset from "./pages/PasswordReset"; // Import new PasswordReset page
import Dashboard from "./pages/admin/Dashboard";
import ExhibitionsManager from "./pages/admin/ExhibitionsManager";
import MessagesManager from "./pages/admin/MessagesManager";
import SettingsManager from "./pages/admin/SettingsManager";
import ExperiencesManager from "./pages/admin/ExperiencesManager";
import SkillsManager from "./pages/admin/SkillsManager";
import BlogPostsManager from "./pages/admin/BlogPostsManager";
import LegalPagesManager from "./pages/admin/LegalPagesManager";
import NotFound from "./pages/NotFound";
import { ReactNode } from "react"; // Import ReactNode

// ProtectedRoute component to guard private routes
const ProtectedRoute = ({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    // Optionally render a loading spinner or skeleton
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    // Not logged in, redirect to auth page
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Logged in but not an admin, redirect to home or a permission denied page
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter> {/* Switched to HashRouter */}
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/repositories/:owner/:repoName" element={<RepositoryDetail />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/thoughts/:slug" element={<ThoughtDetail />} />
          <Route path="/legal/:slug" element={<LegalPageDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<PasswordReset />} /> {/* New password reset route */}
          <Route path="/register" element={<Navigate to="/auth" replace />} /> {/* Redirect /register to /auth */}

          {/* Admin Routes - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Removed /admin/artworks route */}
          <Route
            path="/admin/exhibitions"
            element={
              <ProtectedRoute adminOnly>
                <ExhibitionsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute adminOnly>
                <MessagesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute adminOnly>
                <SettingsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/experiences"
            element={
              <ProtectedRoute adminOnly>
                <ExperiencesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute adminOnly>
                <SkillsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog-posts"
            element={
              <ProtectedRoute adminOnly>
                <BlogPostsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/legal-pages"
            element={
              <ProtectedRoute adminOnly>
                <LegalPagesManager />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
