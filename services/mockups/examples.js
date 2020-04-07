const { MOCKUPS } = require("./index");

MOCKUP_EXAMPLES = [
  "cat-ufo",
  "hipster-giraffe",
  "new-adventure",
  "sugar-skull",
  "surfing-summertime-2020",
].reduce(
  (obj, exampleId) => ({
    ...obj,
    [exampleId]: {
      artwork: __dirname + `/examples/${exampleId}.png`,
      mockups: Object.keys(MOCKUPS).reduce(
        (obj, templateId) => ({
          ...obj,
          [templateId]: __dirname + `/examples/${exampleId}-${templateId}.jpg`,
        }),
        {}
      ),
    },
  }),
  {}
);

module.exports = {
  MOCKUP_EXAMPLES,
};
