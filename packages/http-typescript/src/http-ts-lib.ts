import Ajv = require("ajv");
import * as TJS from "typescript-json-schema";

export const generateSchema = (
  type: string,
  files: string[],
  compilerOptions: any = {
    lib: ["es2015"],
    strict: true,
    resolveJsonModule: true,
    esModuleInterop: true
  },
  tjsArgs: TJS.PartialArgs = {
    noExtraProps: true,
    required: true
  }
) => {
  const program = TJS.getProgramFromFiles(files, compilerOptions);
  const schema = TJS.generateSchema(program, type, tjsArgs);
  if (schema == null) {
    throw new Error(`Unable to generate schema for ${type}`);
  }
  return schema;
};

export function validateTypes(
  files: string[],
  type: string,
  received: any,
  tjsArgs?: TJS.PartialArgs,
  compilerOptions?: any,
  ajvOptions: Ajv.Options = {
    allErrors: true
  }
) {
  const schema = generateSchema(type, files, compilerOptions, tjsArgs);
  const ajv = new Ajv(ajvOptions);
  const validation = ajv.compile(schema);
  const pass = validation(received);
  return { pass, validation };
}
