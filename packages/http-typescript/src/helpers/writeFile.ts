import prettier from "prettier";
import fs from "fs";
import util from "util";

export const writeFile = util.promisify(fs.writeFile);

export const writeJsonFile = (thePath: string, content: string) =>
  writeFile(thePath, prettier.format(content, { parser: "json5" }), "utf8");

export const writeTsFile = (thePath: string, content: string) =>
  writeFile(
    thePath,
    prettier.format(content, { parser: "typescript" }),
    "utf8"
  );
