import path from "path";
import globby from "globby";
import mapSeries from "p-map-series";
import { CommandBuilder, Arguments } from "yargs";
import { generateSchema } from "../http-ts-lib";
import { writeJsonFile } from "../helpers/writeFile";

export const command = "gen-schema";
export const describe = "generate json schema from definitions";

export const builder: CommandBuilder = yargs => yargs;
export const handler = async (args: Arguments) => {
  const files = await globby([
    "**/{GET,DELETE,PUT,POST,PATCH}.*.ts",
    "!**/*.d.ts",
    "!**/*.test.ts",
    "!**/node_modules"
  ]);
  mapSeries(files, async file => {
    const pathParts = path.parse(file);
    const schemaPathName =
      path.join(pathParts.dir, pathParts.name) + ".schema.json";
    const schema = generateSchema("Response", [path.resolve(file)]);
    await writeJsonFile(schemaPathName, JSON.stringify(schema));
  });
};
