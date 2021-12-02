import { getTileSrc } from "../src/components/tileHelpers";
import levels from "../src/data";
import { TerrainTile } from "../src/types";
import glob from "glob";
import { unlink } from "fs";

const getUnusedFiles = async (usedImagePaths: string[]) =>
  new Promise<string[]>((resolve) => {
    glob("public/images/**/*.png", function (er, files) {
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.

      const unusedImagePaths: string[] = files.filter(
        (fileName) => !usedImagePaths.includes(fileName)
      );
      resolve(unusedImagePaths);
    });
  });

const main = async () => {
  const tiles = Object.values(levels).reduce(
    (result, level) => result.concat(level.tiles).concat(level.decorations),
    [] as TerrainTile[]
  );

  const usedImagePaths = tiles
    .map((tile) => `public${getTileSrc(tile)}`)
    .filter((el, idx, lst) => lst.indexOf(el) === idx);

  const unusedFiles = await getUnusedFiles(usedImagePaths);

  console.log(`purging ${unusedFiles.length} unused assets...`);

  unusedFiles.forEach((fileName) => {
    console.log(`deleting ${fileName}...`);
    unlink(fileName, () => {});
  });
  console.log(`removed ${unusedFiles.length} unused assets.`);
};

main();
