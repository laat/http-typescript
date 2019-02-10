// tslint:disable:no-console
import { CommandBuilder } from "yargs";
import makeDir from "make-dir";
import {
  HTTPMethod,
  ResponseTemplate,
  ResponseTestTemplate
} from "../templates";
import fs from "fs";
import util from "util";
import path from "path";
import prettier from "prettier";
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
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
  const responseTestFixturePath = path.join(
    fixturesPath,
    `GET.v${args.apiVersion}.test.json`
  );
  const responseTsPath = path.join(args.pathname, `GET.v${args.apiVersion}.ts`);
  const responseTestTsPath = path.join(
    args.pathname,
    `GET.v${args.apiVersion}.test.ts`
  );
  if (await exists(responseTsPath)) {
    console.error(`ERROR: "${responseTsPath}" already exits`);
    return process.exit(1);
  }
  if (await exists(responseTestTsPath)) {
    console.error(`ERROR: "${responseTestTsPath}" already exits`);
    return process.exit(1);
  }
  if (await exists(responseTestFixturePath)) {
    console.error(`ERROR: "${responseTestFixturePath}" already exits`);
    return process.exit(1);
  }
  await makeDir(args.pathname);
  await makeDir(fixturesPath);
  await writeFile(
    responseTsPath,
    prettier.format(
      ResponseTemplate({
        method: args.method,
        version: args.apiVersion,
        pathname: args.pathname
      }),
      { parser: "typescript" }
    ),
    "utf8"
  );
  await writeFile(
    responseTestTsPath,
    prettier.format(
      ResponseTestTemplate({
        method: args.method,
        version: args.apiVersion,
        pathname: args.pathname
      }),
      { parser: "typescript" }
    ),
    "utf8"
  );
  await writeFile(
    responseTestFixturePath,
    prettier.format(
      JSON.stringify({
        todo: "example response goes here."
      }),
      { parser: "json" }
    ),
    "utf8"
  );
};
