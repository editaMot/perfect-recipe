import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes/RoutesConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<span>Loading...</span>}>
        <BrowserRouter>
          <RoutesConfig />
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
