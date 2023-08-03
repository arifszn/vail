#!/usr/bin/env node

const { initCommand } = require('./console/Init-command');
const { INIT } = require('./constants/commands');

const command = process.argv[2];

if (command === INIT) {
  initCommand();
} else {
  console.error(`Unknown command: ${command}`);
}
