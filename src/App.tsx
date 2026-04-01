import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Offline from "./pages/Offline";

import Referrals from "./pages/dashboard/Referrals";
import ReferralDetail from "./pages/dashboard/ReferralDetail";
import Copilot from "./pages/dashboard/Copilot";
import Handoff from "./pages/dashboard/Handoff";
import Meetings from "./pages/dashboard/Meetings";
import Services from "./pages/dashboard/Services";
import Analytics from "./pages/dashboard/Analytics";
import Reports from "./pages/dashboard/Reports";
import SettingsPage from "./pages/dashboard/Settings";

import AdminUsers from "./pages/admin/Users";
import AdminPrompts from "./pages/admin/Prompts";
import AdminReviews from "./pages/admin/Reviews";
import AdminAudit from "./pages/admin/Audit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/referrals" element={<Referrals />} />
          <Route path="/dashboard/referrals/:id" element={<ReferralDetail />} />
          <Route path="/dashboard/copilot" element={<Copilot />} />
          <Route path="/dashboard/handoff" element={<Handoff />} />
          <Route path="/dashboard/meetings" element={<Meetings />} />
          <Route path="/dashboard/services" element={<Services />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/prompts" element={<AdminPrompts />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/audit" element={<AdminAudit />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
