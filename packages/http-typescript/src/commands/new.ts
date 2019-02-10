// tslint:disable:no-console
import { CommandBuilder } from "yargs";
import makeDir from "make-dir";
import {
  HTTPMethod,
  ResponseTemplate,
  ResponseTestTemplate
} from "../templates";
import path from "path";
import { checkDoesNotExist } from "../helpers/checkDoesNotExist";
import { writeTsFile, writeJsonFile } from "../helpers/writeFile";
interface NewArgs {
  method: HTTPMethod;
  pathname: string;
  apiVersion: string;
}
const methods: HTTPMethod[] = ["DELETE", "GET", "PUT", "POST", "PATCH"];

export const command = "new <method> <pathname> [<api-version>]";
export const describe = "Start typing a new endpoint";
export const builder: CommandBuilder = yargs =>
  yargs
    .positional("method", {
      choices: methods
    })
    .positional("pathname", {
      coerce: (arg: string) => {
        // trim leading and trailing slashes
        return arg.replace(/^\/|\/$/g, "");
      }
    })
    .positional("api-version", {
      type: "string",
      default: "1.0",
      coerce: (arg: string) => {
        if (!/^[0-9\.]+$/.test(arg)) {
          throw new Error("invalid version, use semver");
        }
        return arg;
      }
    })
    .strict();

export const handler = async (args: NewArgs) => {
  const fixturesPath = path.join(args.pathname, "__fixtures__");
  const filePrefix = `${args.method}.v${args.apiVersion}`;
  const responseTestFixturePath = path.join(
    fixturesPath,
    `${filePrefix}.test.json`
  );
  const responseTsPath = path.join(args.pathname, `${filePrefix}.ts`);
  const responseTestTsPath = path.join(args.pathname, `${filePrefix}.test.ts`);

  checkDoesNotExist(responseTsPath);
  checkDoesNotExist(responseTestTsPath);
  checkDoesNotExist(responseTestFixturePath);

  await makeDir(args.pathname);
  await makeDir(fixturesPath);
  await writeTsFile(
    responseTsPath,
    ResponseTemplate({
      method: args.method,
      version: args.apiVersion,
      pathname: args.pathname
    })
  );
  await writeTsFile(
    responseTestTsPath,
    ResponseTestTemplate({
      method: args.method,
      version: args.apiVersion,
      pathname: args.pathname
    })
  );
  await writeJsonFile(
    responseTestFixturePath,
    JSON.stringify({
      todo: "example response goes here."
    })
  );
};
