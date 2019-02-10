import Ajv from "ajv";
import * as TJS from "typescript-json-schema";

export function validateTypes(
  files: string[],
  type: string,
  received: any,
  tjsArgs: TJS.PartialArgs = {
    noExtraProps: true,
    required: true
  },
  compilerOptions = {
    lib: ["es2015"],
    strict: true,
    resolveJsonModule: true,
    esModuleInterop: true
  }
) {
  const program = TJS.getProgramFromFiles(files, compilerOptions);
  const schema = TJS.generateSchema(program, type, tjsArgs);
  if (schema == null) {
    throw new Error(`Unable to generate schema for ${type}`);
  }
  const ajv = new Ajv({
    allErrors: true
  });
  const validate = ajv.compile(schema);
  const pass = validate(received);
  return { pass, validate };
}
