import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AnnouncementProvider } from "./context/AnnouncementContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AnnouncementProvider>
        <App />
      </AnnouncementProvider>
    </ChakraProvider>
  </React.StrictMode>
);
