import React, { useEffect } from "react";
import ReactGA from "react-ga";

import Head from "./components/Head";
import ImageGrid from "./components/ImageGrid";

const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);
  return (
    <>
      <Head />
      <div className="container">
        <h1>Mockup Mark</h1>
        <h2>Realistic apparel mockup generator</h2>
        <hr />
        <ImageGrid />
      </div>
    </>
  );
};

export default App;
