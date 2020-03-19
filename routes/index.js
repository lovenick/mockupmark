const express = require("express");
const router = express.Router();

const { MOCKUPS } = require("../services/mockups");
const images = MOCKUPS.map(x =>
  x.template
    .split("/")
    .slice(-2)
    .join("/")
);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Mockup Mark", images });
});

module.exports = router;
