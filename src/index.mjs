#!/usr/bin/env node

import { dockerComposeCommand } from './console/docker-compose-command.mjs';
import { initCommand } from './console/init-command.mjs';
import { INIT } from './constants/commands.mjs';
import { displayErrorMessage } from './utils/index.mjs';

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
