const { execSync } = require('child_process');
const { displayErrorMessage } = require('../utils');

const dockerComposeCommand = async (processArgv) => {
  try {
    // Execute the Docker Compose command using execSync
    execSync(`docker-compose ${processArgv.slice(2).join(' ')}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    displayErrorMessage('An error occurred while running the command.');
    process.exit(1);
  }
};

module.exports = { dockerComposeCommand };
