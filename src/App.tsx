import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import HCPMap from "./pages/HCPMap";
import CalendarPage from "./pages/CalendarPage";
import TourPlanPage from "./pages/TourPlanPage";
import RoutePlanner from "./pages/RoutePlanner";
import FollowUpsPage from "./pages/FollowUpsPage";
import AIInsights from "./pages/AIInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<HCPMap />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tour-plan" element={<TourPlanPage />} />
            <Route path="/route" element={<RoutePlanner />} />
            <Route path="/follow-ups" element={<FollowUpsPage />} />
            <Route path="/ai-insights" element={<AIInsights />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
