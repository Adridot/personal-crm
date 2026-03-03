import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { queryClient } from "@/lib/query-client";
import { router } from "@/router";

import "./index.css";

const rootElement = document.getElementById("app");

if (!(rootElement instanceof HTMLElement)) {
  throw new Error(
    'Failed to initialize the web app: root element "#app" was not found.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
