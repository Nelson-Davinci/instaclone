import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App.jsx";
import AuthProvider from "./store/AuthProvider.jsx";
import PostsProvider from "./store/PostsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </StrictMode>
);
