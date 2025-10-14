import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Simple navigation bar */}
        <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/chatbot" style={{ marginRight: "1rem" }}>Chatbot</Link>
          <Link to="/upload" style={{ marginRight: "1rem" }}>Upload</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* Page routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
