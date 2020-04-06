const express = require("express");
const router = express.Router();

const tempy = require("tempy");
const multer = require("multer");
const sharpStorage = require("multer-sharp-storage");
const upload = multer({
  storage: sharpStorage({
    output: "png",
    quality: 90,
    sharpMiddleware: function (sharp) {
      sharp.resize({
        width: 480,
        height: 640,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
      return sharp;
    },
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
  }),
});

const { generateMockup, MOCKUPS } = require("../services/mockups");

/* upload artwork */
router.post("/", upload.single("artwork"), function (req, res, next) {
  const artwork = req.file.filename.slice(0, -4); // remove .png extension

  const images = Object.keys(MOCKUPS).map(
    (templateId) => `${req.originalUrl}/${artwork}/${templateId}.jpg`
  );

  res.json({ images });
});

/* generate artwork mockup */
router.get("/:artworkId/:templateId.jpg", function (req, res, next) {
  const artwork = `uploads/${req.params.artworkId}.png`;
  const {
    template,
    mask,
    displacementMap,
    lightingMap,
    adjustmentMap,
    coordinates,
  } = MOCKUPS[req.params.templateId];
  const out = tempy.file({ extension: "jpg" });
  generateMockup({
    artwork,
    template,
    mask,
    displacementMap,
    lightingMap,
    adjustmentMap,
    coordinates,
    out,
  }).then(() => res.sendFile(out));
});

module.exports = router;
