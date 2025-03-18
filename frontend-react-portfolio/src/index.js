import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./CMSAdmin/Auth/AuthContext";
import { SectionVisibilityProvider } from "./CMSAdmin/SectionVisibilityContext/SectionVisibilityContext";
import { FetchCacheProvider } from "./Components/Context/FetchCacheContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    {/* Authentication Context for managing user authentication */}
    <AuthProvider>
      {/*Context for caching data*/}
      <FetchCacheProvider>
        {/* Section Visibility Context for dynamic section rendering */}
        <SectionVisibilityProvider>
          <App />
        </SectionVisibilityProvider>
      </FetchCacheProvider>
    </AuthProvider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
