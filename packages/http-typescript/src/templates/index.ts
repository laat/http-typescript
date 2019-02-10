import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
export type HTTPMethod = "DELETE" | "GET" | "PUT" | "POST" | "PATCH";
export const ResponseTemplate = Handlebars.compile<{
  method: HTTPMethod;
  version: string;
  pathname: string;
}>(fs.readFileSync(path.join(__dirname, "response.ts.template"), "utf8"));
export const ResponseTestTemplate = Handlebars.compile<{
  method: HTTPMethod;
  version: string;
  pathname: string;
}>(fs.readFileSync(path.join(__dirname, "response.test.ts.template"), "utf8"));
