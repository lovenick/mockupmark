import React from "react";

import Head from "./components/Head";
import ImageGrid from "./components/ImageGrid";

const App = () => {
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
