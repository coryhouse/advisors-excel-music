import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { worker } from "./mocks/browser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

if (import.meta.env.VITE_ENABLE_MSW === "true") {
  worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true, // display error boundary if any query fails
      retry: false, // disable retries on all queries
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Oops!</p>}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
