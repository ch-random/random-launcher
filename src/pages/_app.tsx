import React from "react";
import type { AppProps } from "next/app";

import "../style.css";
import "../App.css";
import reportWebVitals from "../utils/reportWebVitals";

// https://bit.ly/CRA-vitals
reportWebVitals();

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
