// tslint:disable:no-console
import { CommandBuilder } from "yargs";
import makeDir from "make-dir";

type Method = "DELETE" | "GET" | "PUT" | "POST" | "PATCH";
interface NewArgs {
  method: Method;
  pathname: string;
  version: string;
}
const methods: Method[] = ["DELETE", "GET", "PUT", "POST", "PATCH"];
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

export const handler = (args: NewArgs) => {
  makeDir(args.pathname);
};
