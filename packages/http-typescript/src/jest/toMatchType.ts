import chalk from "chalk";
import { matcherHint } from "jest-matcher-utils";
import { validateTypes } from "../validateTypes";

declare global {
  namespace jest {
    // tslint:disable-next-line:interface-name
    interface Matchers<R> {
      /**
       * match object against a typescript type
       * @param type TypeScript type to match against
       * @param files Absolute paths to files to include when finding the type
       */
      toMatchType(type: string, ...files: string[]): R;
    }
  }
}

export const toMatchType: any = (
  received: any,
  type: string,
  file: string,
  ...extraFiles: string[]
): any => {
  const { pass, validate } = validateTypes(
    [file, ...extraFiles],
    type,
    received
  );

  const message = pass
    ? () =>
        `${matcherHint(
          ".not.toMatchType",
          undefined,
          "schema"
        )}\n\nExpected value not to match type`
    : () => {
        let messageToPrint = `received\n`;
        const errors = validate.errors || [];
        errors.forEach(error => {
          let line = `${error.dataPath} ${error.message}`;

          if (error.keyword === "additionalProperties") {
            line += `, but found '${
              // @ts-ignore
              error.params.additionalProperty
            }'`;
          }

          messageToPrint += chalk.red(`  ${line}\n`);
        });
        return `${matcherHint(
          ".toMatchType",
          undefined,
          "schema"
        )}\n\n${messageToPrint}`;
      };
  return {
    actual: received,
    message,
    pass
  };
};
