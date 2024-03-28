import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WatchlistProvider from "./Store/WatchlistStore.jsx";
import Storeprovider from "./Store/Store.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WatchlistProvider>
      <Storeprovider>
        <App />
      </Storeprovider>
    </WatchlistProvider>
  </React.StrictMode>
);
