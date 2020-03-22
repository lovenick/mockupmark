# How to add a new template to mockupmark

## 1. Create template image

- Resize image to around 1200x1600 (make smallest dimension 1200px)
- Save this image as your template image `xx-template.jpg`

## 2. Create mask image

- Select the t-shirt using the smart selection tool
- Make selected region white and the rest of the image black
  - Create new layer and fill selection with white
  - Clear selection
  - Create another layer below and make it black
- Save this image as your mask image `xx-mask.png`

## 3. Get artwork coordinates

- Find the 4 corners of the artwork region
  - Create new layer and add a 4x3 rectangle
  - Transform the rectangle so it matches the artwork region
  - Hover over the corners and check the x and y coordinates in the info panel
- Write down the coordinates starting from the top left and going **counterclockwise** as `[x1, y1, x2, y2, x3, y3, x4, y4]`

## 4. Generate displacement and lighting maps

- Check out the https://github.com/kvdenden/mockupmark-prototype repository
- Copy your template and mask images to this folder
- Copy an artwork to this folder
- Change the template, mask and coordinates parameters in the generation methods at the bottom
- Run the script: `node index.js`

## 5. Add images and config to mockupmark

- Copy the template, mask, displacement map and lighting map to the `services/mockups/templates` folder in mockupmark.
  - Make sure that they follow the naming conventions `x-template.jpg`, `x-mask.png`, `x-displace.png` and `x-lighting.png`
- Add a new entry to the `MOCKUPS` array in `services/mockups/index.js`
  ```
  {
    template: __dirname + "/templates/x-template.jpg",
    mask: __dirname + "/templates/x-mask.png",
    displacementMap: __dirname + "/templates/x-displace.png",
    lightingMap: __dirname + "/templates/x-lighting.png",
    coordinates: [x1, y1, x2, y2, x3, y3, x4, y4]
  }
  ```
