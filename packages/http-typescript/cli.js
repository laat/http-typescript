#!/usr/bin/env node
// tslint:disable:no-unused-expression no-var-requires
// TODO: do a proper build
require("ts-node").register({
  project: require("path").join(__dirname, "tsconfig.json")
});
require("yargs")
  .commandDir("commands", { extensions: ["ts", "js"] })
  .demandCommand()
  .strict()
  .help().argv;
