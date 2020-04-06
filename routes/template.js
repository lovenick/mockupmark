const express = require("express");
const router = express.Router();
const { MOCKUPS } = require("../services/mockups");

router.get("/", function (req, res, next) {
  const templates = Object.keys(MOCKUPS).reduce(
    (obj, templateId) => ({
      ...obj,
      [templateId]: { path: `${req.baseUrl}/${templateId}.jpg` },
    }),
    {}
  );
  res.json({ templates });
});

router.get("/:templateId.jpg", function (req, res, next) {
  const mockup = MOCKUPS[req.params.templateId];
  if (mockup) {
    res.sendFile(mockup.template);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
