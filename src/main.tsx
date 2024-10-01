import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./index.css";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        toastOptions={{
          className: "bg-main-dark text-white",
        }}
      />
    </QueryClientProvider>
  </NextUIProvider>
);
