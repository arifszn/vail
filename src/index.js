#!/usr/bin/env node

const { dockerComposeCommand } = require('./console/docker-compose-command');
const { initCommand } = require('./console/init-command');
const { INIT } = require('./constants/commands');

const command = process.argv[2];

if (command === INIT) {
  initCommand();
} else if (command) {
  // If the command is not "init", assume it's a Docker Compose command
  dockerComposeCommand(process.argv);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
