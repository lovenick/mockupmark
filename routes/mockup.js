var express = require("express");
var router = express.Router();

var tempy = require("tempy");
var multer = require("multer");
var upload = multer({
  dest: "uploads/"
});

const { generateMockup, MOCKUPS } = require("../services/mockups");
// console.log(MOCKUPS)

/* upload artwork */
router.post("/", upload.single("artwork"), function(req, res, next) {
  const artwork = req.file.filename;
  const images = [...MOCKUPS.keys()].map(
    mockupId => `${req.originalUrl}/${mockupId}/${artwork}`
  );
  res.render("artwork", {
    title: "Mockups",
    images
  });
});

/* generate artwork mockup */
router.get("/:mockup/:artwork", function(req, res, next) {
  const artwork = `uploads/${req.params.artwork}`;
  const { template, mask, displacementMap, lightingMap, coordinates } = MOCKUPS[
    req.params.mockup
  ];
  const out = tempy.file({ extension: "jpg" });
  generateMockup({
    artwork,
    template,
    mask,
    displacementMap,
    lightingMap,
    coordinates,
    out
  }).then(() => res.sendFile(out));
});

module.exports = router;
