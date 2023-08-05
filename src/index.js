#!/usr/bin/env node

const { dockerComposeCommand } = require('./console/docker-compose-command');
const { initCommand } = require('./console/init-command');
const { INIT } = require('./constants/commands');
const { displayErrorMessage } = require('./utils');

const command = process.argv[2];

if (!command) {
  displayErrorMessage(`No command provided.`);
  process.exit(1);
} else if (command === INIT) {
  initCommand();
} else {
  // Assume it's a Docker Compose command
  dockerComposeCommand(process.argv);
}
