import fs from "fs";
import sharp from "sharp";

const imagePath = process.argv[2];
const configPath = process.argv[3];

const rawdata = fs.readFileSync(configPath, "utf8");
const config: {
  columns: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tiledversion: string;
  tileheight: number;
  tilewidth: number;
  type: "tileset";
  version: string;
} = JSON.parse(rawdata);

sharp(imagePath)
  .metadata()
  .then((metadata) => {


    
    const splitHeight = Math.floor(metadata.height / 2);

    // Extract top half
    sharp(imagePath)
      .extract({ left: 0, top: 0, width: metadata.width, height: splitHeight })
      .toFile("top-half.jpg");

    // Extract bottom half
    sharp(imagePath)
      .extract({
        left: 0,
        top: splitHeight,
        width: metadata.width,
        height: splitHeight,
      })
      .toFile("bottom-half.jpg");
  })
  .catch((err) => {
    console.error("Error splitting the image:", err);
  });
