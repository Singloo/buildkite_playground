const fs = require("fs");
const path = require("path");

const BUILD_DIR_PATH = path.resolve(__dirname, "..", "build");

const loopDir = (pth) => {
  const fileStat = fs.statSync(pth);
  if (fileStat.isDirectory()) {
    const filenames = fs.readdirSync(pth);
    return filenames.map((filename) => loopDir(path.resolve(pth, filename)));
  }
  console.log("FILE", pth);
  return pth;
};

const allPaths = loopDir(BUILD_DIR_PATH).flat();
console.log("FOUND FILE", allPaths.length);
