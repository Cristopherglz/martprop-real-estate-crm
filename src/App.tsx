import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import PropertyDetail from "./pages/PropertyDetail";
import Reels from "./pages/Reels";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProperties from "./pages/dashboard/DashboardProperties";
import DashboardLeads from "./pages/dashboard/DashboardLeads";
import DashboardStats from "./pages/dashboard/DashboardStats";
import DashboardPublish from "./pages/dashboard/DashboardPublish";
import MobileBottomNav from "./components/site/MobileBottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/propiedad/:id" element={<PropertyDetail />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="propiedades" element={<DashboardProperties />} />
            <Route path="leads" element={<DashboardLeads />} />
            <Route path="estadisticas" element={<DashboardStats />} />
            <Route path="publicar" element={<DashboardPublish />} />
            <Route path="agenda" element={<DashboardHome />} />
            <Route path="equipo" element={<DashboardHome />} />
            <Route path="configuracion" element={<DashboardHome />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
