#!/usr/bin/env node
// tslint:disable:no-unused-expression no-var-requires
require("yargs")
  .commandDir("dist/commands")
  .demandCommand()
  .strict()
  .help().argv;
