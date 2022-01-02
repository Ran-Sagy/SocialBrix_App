import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import "antd/dist/antd.css";
import "../src/antd.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-jinke-music-player/assets/index.css";
import "sweetalert2/src/sweetalert2.scss";
import { QueryClientProvider, QueryClient } from "react-query";
import { FronteggProvider } from "@frontegg/react";
import { Provider } from "react-redux";
import storeConfig from "./store/configureStore";
const store = storeConfig();
const queryClient = new QueryClient();
const contextOptions = {
  baseUrl: "https://app-hiv4v8o6rq4r.frontegg.com",
};

ReactDOM.render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain="dev-kb6j6471.us.auth0.com"
      clientId="PKzMrlPNoqP4V2SBfr10PMIODWCEtw38"
      redirectUri={window.location.origin}
      audience="https://checktoken/api"
    > */}
    <FronteggProvider contextOptions={contextOptions}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </FronteggProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
