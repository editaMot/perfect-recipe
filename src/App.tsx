import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes/RoutesConfig";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <BrowserRouter>
        <RoutesConfig />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
