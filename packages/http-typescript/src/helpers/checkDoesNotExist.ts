import fs from "fs";
import util from "util";

const exists = util.promisify(fs.exists);

export const checkDoesNotExist = async (thePath: string) => {
  if (await exists(thePath)) {
    console.error(`ERROR: "${thePath}" already exits`);
    return process.exit(1);
  }
};
