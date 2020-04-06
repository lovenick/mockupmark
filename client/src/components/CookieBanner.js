import { useEffect } from "react";

import "cookieconsent";
import "cookieconsent/build/cookieconsent.min.css";

const CookieBanner = () => {
  useEffect(() => {
    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#252e39",
        },
        button: {
          background: "#14a7d0",
        },
      },
      theme: "classic",
      location: true,
      cookie: {
        domain: process.env.REACT_APP_COOKIE_DOMAIN,
      },
    });
  }, []);

  return null;
};

export default CookieBanner;
