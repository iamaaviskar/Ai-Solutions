import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminInquiries from "./pages/admin/Enquiries";

// Placeholder pages (to be built in later steps)
import AdminQueries from "./pages/admin/Queries";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminGallery from "./pages/admin/AdminGallery";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site with Navbar and Footer */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:slug" element={<ArticlePage />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin login without layout */}
          <Route path="admin/login" element={<AdminLogin />} />

          {/* Protected admin area */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/enquiries" element={<AdminInquiries />} />
              <Route path="admin/queries" element={<AdminQueries />} />
              <Route path="admin/articles" element={<AdminArticles />} />
              <Route path="admin/gallery" element={<AdminGallery />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
