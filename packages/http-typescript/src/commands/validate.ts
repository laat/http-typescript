import { CommandBuilder, Arguments } from "yargs";
import chalk from "chalk";
import path from "path";
import getStdin from "get-stdin";
import loadJsonFile from "load-json-file";
import { validateTypes } from "../http-ts-lib";

export const command = "validate <types-file> [<json-file>]";

export const describe =
  "Validate a json document against the TypeScript definition";

export const builder: CommandBuilder = yargs =>
  yargs
    .positional("types-file", {
      coerce: (file: string) => path.resolve(file)
    })
    .positional("json-file", {
      coerce: async (file: string) => await loadJsonFile(path.resolve(file))
    })
    .strict();

export const handler = async (
  args: Arguments<{ typesFile: string; jsonFile?: Promise<string> }>
) => {
  let json = await args.jsonFile;
  if (json == null) {
    const stdin = await getStdin();
    if (stdin) {
      json = JSON.parse(stdin);
    }
  }
  if (!json) {
    console.error(`json-file required. either as an argument or from stdin`);
    return process.exit(1);
  }
  const { pass, validation } = validateTypes(
    [args.typesFile],
    "Response",
    json
  );
  if (pass) {
    console.log(`${chalk.green("PASS")}: the types are correct`);
    process.exit(0);
  } else {
    (validation.errors || []).forEach(error => {
      let line = `${error.dataPath} ${error.message}`;
      if (error.keyword === "additionalProperties") {
        line += `, but found '${
          // @ts-ignore
          error.params.additionalProperty
        }'`;
      }
      console.error(chalk.red(line));
    });
    console.error(chalk.red("FAILED"));
    process.exit(1);
  }
};
