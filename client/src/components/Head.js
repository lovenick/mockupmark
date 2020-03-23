import React from "react";
import Helmet from "react-helmet";

const Head = ({ title = "Mockup Mark" }) => (
  <Helmet>
    <title>{title}</title>
    <link
      href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);

export default Head;
