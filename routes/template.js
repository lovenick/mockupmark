const express = require("express");
const router = express.Router();
const { MOCKUPS } = require("../services/mockups");

router.get("/", function(req, res, next) {
  const templates = Object.keys(MOCKUPS).map(id => `${id}.jpg`);
  res.json({ templates });
});

router.get("/:mockupId.jpg", function(req, res, next) {
  const mockup = MOCKUPS[parseInt(req.params.mockupId)];
  if (mockup) {
    res.sendFile(mockup.template);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
