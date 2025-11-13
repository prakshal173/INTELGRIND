import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BeforeQuestions from "./pages/BeforeQuestions";
import TrainingHub from "./pages/TrainingHub";
import AfterQuestions from "./pages/AfterQuestions";
import ModuleOSINT from "./pages/ModuleOSINT";
import ModuleSIGINT from "./pages/ModuleSIGINT";
import ModuleCYBINT from "./pages/ModuleCYBINT";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/before-questions" element={<BeforeQuestions />} />
          <Route path="/training-hub" element={<TrainingHub />} />
          <Route path="/after-questions" element={<AfterQuestions />} />
          <Route path="/module/osint" element={<ModuleOSINT />} />
          <Route path="/module/sigint" element={<ModuleSIGINT />} />
          <Route path="/module/cybint" element={<ModuleCYBINT />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
