import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProvideAuth } from "./hooks/useAuth";
import Routing from "./routing/Routing";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <Routing />
        </ProvideAuth>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
};

export default App;
