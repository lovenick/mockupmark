const express = require("express");
const router = express.Router();

const { MOCKUP_EXAMPLES } = require("../services/mockups/examples");

router.get("/", function (req, res, next) {
  const examples = Object.entries(MOCKUP_EXAMPLES).reduce(
    (obj, [exampleId, example]) => ({
      ...obj,
      [exampleId]: {
        path: `${req.baseUrl}/${exampleId}.png`,
        mockups: Object.keys(example.mockups).reduce(
          (obj, templateId) => ({
            ...obj,
            [templateId]: `${req.baseUrl}/${exampleId}/${templateId}.jpg`,
          }),
          {}
        ),
      },
    }),
    {}
  );
  res.json({ examples });
});

router.get("/:exampleId.png", function (req, res, next) {
  const example = MOCKUP_EXAMPLES[req.params.exampleId];
  res.sendFile(example.artwork);
});

router.get("/:exampleId/:templateId.jpg", function (req, res, next) {
  const mockup =
    MOCKUP_EXAMPLES[req.params.exampleId]["mockups"][req.params.templateId];
  res.sendFile(mockup);
});

module.exports = router;
