import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthGuard from "@/components/AuthGuard";

import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Offline from "./pages/Offline";
import Landing from "./pages/Landing";

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

const P = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard>{children}</AuthGuard>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<P><Dashboard /></P>} />
          <Route path="/dashboard/referrals" element={<P><Referrals /></P>} />
          <Route path="/dashboard/referrals/detail" element={<P><ReferralDetail /></P>} />
          <Route path="/dashboard/copilot" element={<P><Copilot /></P>} />
          <Route path="/dashboard/handoff" element={<P><Handoff /></P>} />
          <Route path="/dashboard/meetings" element={<P><Meetings /></P>} />
          <Route path="/dashboard/services" element={<P><Services /></P>} />
          <Route path="/dashboard/analytics" element={<P><Analytics /></P>} />
          <Route path="/dashboard/reports" element={<P><Reports /></P>} />
          <Route path="/dashboard/settings" element={<P><SettingsPage /></P>} />
          <Route path="/admin" element={<P><Admin /></P>} />
          <Route path="/admin/users" element={<P><AdminUsers /></P>} />
          <Route path="/admin/prompts" element={<P><AdminPrompts /></P>} />
          <Route path="/admin/reviews" element={<P><AdminReviews /></P>} />
          <Route path="/admin/audit" element={<P><AdminAudit /></P>} />
          <Route path="/offline" element={<Offline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
