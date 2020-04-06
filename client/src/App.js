import React from "react";

import Head from "./components/Head";
import Analytics from "./components/Analytics";
import Navbar from "./components/Navbar";
import ImageGrid from "./components/ImageGrid";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

const App = () => {
  return (
    <>
      <Head />
      <Analytics />
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
      <CookieBanner />
    </>
  );
};

export default App;
