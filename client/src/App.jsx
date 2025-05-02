import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <Toaster position="top-center" expand={true} richColors />
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;
