#! /usr/bin/env node
const { install, beta } = require("../dist/index");

const argv = process.argv.slice(2);
if (argv[0] === "beta") {
  const args = argv.slice(1);
  beta(args);
} else {
  install("Million Lint");
}
