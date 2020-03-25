const util = require("util");
const exec = util.promisify(require("child_process").exec);
const tempy = require("tempy");

// convert template.jpg mask.png -alpha off -colorspace gray -compose copyopacity -composite masked_template.png
async function generateNormalizedTemplateMap(params) {
  const { template, mask, out } = params;

  const tmp = tempy.file({ extension: "mpc" });

  const applyMask = `convert ${template} ${mask} -alpha off -colorspace gray -compose CopyOpacity -composite ${tmp}`;
  await exec(applyMask);

  const { stdout: brightness } = await exec(
    `convert ${tmp} -background grey50 -alpha remove -format "%[fx:mean]" info:`
  );

  const { stdout: opacityAmount } = await exec(
    `convert ${mask} -format "%[fx:mean]" info:`
  );

  const brightnessDelta = (100 * (brightness - 0.5)) / opacityAmount;

  const adjustBrightness = `convert ${tmp} -evaluate subtract ${brightnessDelta}% -background grey50 -alpha remove -alpha off ${out}`;
  await exec(adjustBrightness);
}

async function generateLightingMap(params) {
  await generateNormalizedTemplateMap(params);
}

async function generateDisplacementMap(params) {
  const { template, mask, out } = params;
  const { blur = 10 } = params;

  const tmp = tempy.file({ extension: "mpc" });
  await generateNormalizedTemplateMap({ template, mask, out: tmp });

  await exec(`convert ${tmp} -blur 0x${blur} ${out}`);
}

async function resize(params) {
  const { artwork, out } = params;
  const { size = 400 } = params;
  await exec(`convert ${artwork} -scale ${size} ${out}`);
}

async function addBorder(params) {
  const { artwork, out } = params;
  await exec(`convert ${artwork} -bordercolor transparent -border 1 ${out}`);
}

// convert template.jpg -alpha transparent \( artwork.png +distort perspective "0,0,940,2650,0,2000,940,3460,2000,2000,1740,3540,2000,0,1740,2800" \) -background transparent -layers merge +repage artwork_distorted.png
async function perspectiveTransform(params) {
  const { template, artwork, out } = params;
  const [x1, y1, x2, y2, x3, y3, x4, y4] = params.coordinates;
  const [w, h] = await exec(
    `identify -format "%w,%h" ${artwork}`
  ).then(({ stdout }) => stdout.split(",").map(s => parseInt(s)));

  const coordinates = [0, 0, x1, y1, 0, h, x2, y2, w, h, x3, y3, w, 0, x4, y4];

  const transform = `convert ${template} -alpha transparent \\( ${artwork} +distort perspective "${coordinates.join()}" \\) -background transparent -layers merge +repage ${out}`;
  await exec(transform);
}

async function setBackgroundColor(params) {
  const { artwork, color = "transparent", out } = params;
  const setBackground = `convert ${artwork} -background ${color} -alpha remove ${out}`;
  await exec(setBackground);
}

// convert artwork_distorted.png \( masked_template_gray.png -blur 0x10 \) -compose displace -set option:compose:args 10x10 -composite artwork_displaced.png
async function addDisplacement(params) {
  const { artwork, displacementMap, out } = params;
  const { dx = 20, dy = 20 } = params;

  const displace = `convert ${artwork} ${displacementMap} -compose displace -set option:compose:args ${dx}x${dy} -composite ${out}`;
  await exec(displace);
}

// convert artwork_displaced.png \( -clone 0 masked_template_corrected.png -compose hardlight -composite \) +swap -compose copy_opacity -composite artwork_final.png
async function addHighlights(params) {
  const { artwork, lightingMap, out } = params;
  const { mode = "hardlight" } = params;

  const highlight = `convert ${artwork} \\( -clone 0 ${lightingMap} -compose ${mode} -composite \\) +swap -compose CopyOpacity -composite ${out}`;
  await exec(highlight);
}

async function composeArtwork(params) {
  const { template, artwork, mask, out } = params;
  const compose = `convert ${template} ${artwork} ${mask} -compose over -composite ${out}`;
  await exec(compose);
}

// convert template.jpg -compose multiply artwork_final.png -composite mockup.jpg
async function generateMockup(params) {
  const { template, artwork, mask, displacementMap, lightingMap, out } = params;
  const { coordinates } = params;

  const tmp = tempy.file({ extension: "mpc" });
  // await resize({ artwork, out: tmp });
  await addBorder({ artwork, out: tmp });

  await perspectiveTransform({ template, artwork: tmp, coordinates, out: tmp });
  // await setBackgroundColor({ artwork: tmp, color: "black", out: tmp });
  await addDisplacement({ artwork: tmp, displacementMap, out: tmp });
  await addHighlights({ artwork: tmp, lightingMap, out: tmp });
  await composeArtwork({ artwork: tmp, template, mask, out });
}

var MOCKUPS = [
  {
    template: __dirname + "/templates/1-template.jpg",
    mask: __dirname + "/templates/1-mask.png",
    displacementMap: __dirname + "/templates/1-displace.png",
    lightingMap: __dirname + "/templates/1-lighting.png",
    coordinates: [490, 810, 514, 1108, 738, 1098, 734, 799]
  },
  {
    template: __dirname + "/templates/2-template.jpg",
    mask: __dirname + "/templates/2-mask.png",
    displacementMap: __dirname + "/templates/2-displace.png",
    lightingMap: __dirname + "/templates/2-lighting.png",
    coordinates: [501, 536, 505, 861, 799, 869, 816, 544]
  },
  {
    template: __dirname + "/templates/3-template.jpg",
    mask: __dirname + "/templates/3-mask.png",
    displacementMap: __dirname + "/templates/3-displace.png",
    lightingMap: __dirname + "/templates/3-lighting.png",
    coordinates: [675, 735, 682, 1304, 1120, 1313, 1137, 743]
  },
  {
    template: __dirname + "/templates/4-template.jpg",
    mask: __dirname + "/templates/4-mask.png",
    displacementMap: __dirname + "/templates/4-displace.png",
    lightingMap: __dirname + "/templates/4-lighting.png",
    coordinates: [953, 647, 973, 944, 1183, 945, 1184, 620]
  },
  {
    template: __dirname + "/templates/5-template.jpg",
    mask: __dirname + "/templates/5-mask.png",
    displacementMap: __dirname + "/templates/5-displace.png",
    lightingMap: __dirname + "/templates/5-lighting.png",
    coordinates: [572, 602, 563, 860, 755, 867, 763, 608]
  },
  {
    template: __dirname + "/templates/6-template.jpg",
    mask: __dirname + "/templates/6-mask.png",
    displacementMap: __dirname + "/templates/6-displace.png",
    lightingMap: __dirname + "/templates/6-lighting.png",
    coordinates: [352, 646, 459, 855, 616, 774, 509, 565]
  },
  {
    template: __dirname + "/templates/7-template.jpg",
    mask: __dirname + "/templates/7-mask.png",
    displacementMap: __dirname + "/templates/7-displace.png",
    lightingMap: __dirname + "/templates/7-lighting.png",
    coordinates: [420, 1068, 420, 1599, 818, 1599, 818, 1068]
  },
  {
    template: __dirname + "/templates/8-template.jpg",
    mask: __dirname + "/templates/8-mask.png",
    displacementMap: __dirname + "/templates/8-displace.png",
    lightingMap: __dirname + "/templates/8-lighting.png",
    coordinates: [465, 1083, 465, 1522, 790, 1513, 781, 1081]
  },
  {
    template: __dirname + "/templates/9-template.jpg",
    mask: __dirname + "/templates/9-mask.png",
    displacementMap: __dirname + "/templates/9-displace.png",
    lightingMap: __dirname + "/templates/9-lighting.png",
    coordinates: [599, 756, 504, 1068, 777, 1094, 871, 777]
  },
  {
    template: __dirname + "/templates/10-template.jpg",
    mask: __dirname + "/templates/10-mask.png",
    displacementMap: __dirname + "/templates/10-displace.png",
    lightingMap: __dirname + "/templates/10-lighting.png",
    coordinates: [480, 1013, 486, 1370, 746, 1386, 758, 995]
  },
  {
    template: __dirname + "/templates/11-template.jpg",
    mask: __dirname + "/templates/11-mask.png",
    displacementMap: __dirname + "/templates/11-displace.png",
    lightingMap: __dirname + "/templates/11-lighting.png",
    coordinates: [434, 639, 449, 1062, 700, 1062, 716, 635]
  },
  {
    template: __dirname + "/templates/13-template.jpg",
    mask: __dirname + "/templates/13-mask.png",
    displacementMap: __dirname + "/templates/13-displace.png",
    lightingMap: __dirname + "/templates/13-lighting.png",
    coordinates: [424, 648, 405, 1156, 783, 1165, 816, 658]
  },
  {
    template: __dirname + "/templates/16-template.jpg",
    mask: __dirname + "/templates/16-mask.png",
    displacementMap: __dirname + "/templates/16-displace.png",
    lightingMap: __dirname + "/templates/16-lighting.png",
    coordinates: [372, 738, 404, 1286, 733, 1288, 726, 718]
  },
  {
    template: __dirname + "/templates/17-template.jpg",
    mask: __dirname + "/templates/17-mask.png",
    displacementMap: __dirname + "/templates/17-displace.png",
    lightingMap: __dirname + "/templates/17-lighting.png",
    coordinates: [513, 565, 521, 795, 695, 789, 681, 562]
  },
  {
    template: __dirname + "/templates/18-template.jpg",
    mask: __dirname + "/templates/18-mask.png",
    displacementMap: __dirname + "/templates/18-displace.png",
    lightingMap: __dirname + "/templates/18-lighting.png",
    coordinates: [249, 930, 300, 1458, 721, 1437, 666, 892]
  },
  {
    template: __dirname + "/templates/19-template.jpg",
    mask: __dirname + "/templates/19-mask.png",
    displacementMap: __dirname + "/templates/19-displace.png",
    lightingMap: __dirname + "/templates/19-lighting.png",
    coordinates: [490, 730, 489, 1216, 836, 1202, 820, 727]
  },
  {
    template: __dirname + "/templates/20-template.jpg",
    mask: __dirname + "/templates/20-mask.png",
    displacementMap: __dirname + "/templates/20-displace.png",
    lightingMap: __dirname + "/templates/20-lighting.png",
    coordinates: [358, 616, 377, 1146, 755, 1166, 742, 603]
  },
  {
    template: __dirname + "/templates/21-template.jpg",
    mask: __dirname + "/templates/21-mask.png",
    displacementMap: __dirname + "/templates/21-displace.png",
    lightingMap: __dirname + "/templates/21-lighting.png",
    coordinates: [228, 1156, 288, 1900, 908, 1800, 736, 1100]
  },
  {
    template: __dirname + "/templates/22-template.jpg",
    mask: __dirname + "/templates/22-mask.png",
    displacementMap: __dirname + "/templates/22-displace.png",
    lightingMap: __dirname + "/templates/22-lighting.png",
    coordinates: [520, 772, 626, 1152, 926, 1140, 848, 722]
  }
];

module.exports = {
  generateMockup,
  MOCKUPS
};
