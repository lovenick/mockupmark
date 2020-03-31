import React, { useEffect } from "react";
import ReactGA from "react-ga";

import Head from "./components/Head";
import Navbar from "./components/Navbar";
import ImageGrid from "./components/ImageGrid";
import Footer from "./components/Footer";

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
      <Navbar />
      <main className="container">
        <h1 className="display-4">Mockup Mark</h1>
        <h2 className="text-muted">Realistic apparel mockup generator</h2>
        <p className="lead">
          All images can be used for free for commercial and noncommercial use
          across print and digital
        </p>
        <hr />
        <ImageGrid />
      </main>
      <Footer />
    </>
  );
};

export default App;
