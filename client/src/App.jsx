import AppRoutes from "./routes/AppRoutes"
import { HelmetProvider } from "react-helmet-async";

function App() {

  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  )
}

export default App
