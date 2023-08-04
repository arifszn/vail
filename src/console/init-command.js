const fs = require('fs');
const path = require('path');
const { displayErrorMessage, displaySuccessMessage } = require('../utils');
const inquirer = require('inquirer');
const {
  NODE_VERSIONS,
  SERVICES,
  NODE_16,
  MY_SQL,
} = require('../constants/services');

const initCommand = async () => {
  const dockerComposePath = path.resolve(process.cwd(), 'docker-compose.yml');

  // check if docker-compose.yml is already present
  if (fs.existsSync(dockerComposePath)) {
    displayErrorMessage('docker-compose.yml already exists.');

    process.exit(0);
  }

  // Ask the user to select the Node.js version
  const nodeVersionAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeVersion',
      message: 'Select Node.js version:',
      choices: NODE_VERSIONS,
      default: NODE_16,
    },
  ]);

  const selectedNodeVersion = nodeVersionAnswer.nodeVersion;

  // Ask the user to input the server start command
  const serverCommandAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'command',
      message: 'Enter the command to run your server (e.g., npm run dev):',
      default: 'npm run dev',
    },
  ]);

  const serverStartCommand = serverCommandAnswer.command;

  // Ask the user to input the ports
  const portsAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'ports',
      message:
        'Enter the ports to be used, separated by comma (e.g., 3000,3001):',
      default: '3000',
    },
  ]);

  const ports = portsAnswer.ports.split(',').map((port) => port.trim());

  // Ask the user to select the services
  const servicesAnswer = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select the services you want to include:',
      name: 'services',
      choices: SERVICES,
      default: [],
    },
  ]);

  const selectedServices = servicesAnswer.services;

  let dockerfileContext = `./node_modules/vail/runtime`;
  if (!fs.existsSync(dockerfileContext)) {
    displayErrorMessage('No Dockerfile found.');

    process.exit(0);
  }

  let dockerComposeContent = `
version: '3'
services:
  app:
    build:
      context: ${dockerfileContext}
      dockerfile: ./Dockerfile
      args:
        VAIL_NODE_VERSION: ${selectedNodeVersion}
    command: ${serverStartCommand}
    ports:
      ${ports
        .map((port) => `- '\${APP_PORT:-${port}}:${port}'`)
        .join('\n      ')}
    volumes:
      - .:/var/www/html
    networks:
      - vail

networks:
  vail:
    driver: bridge

`;

  /* if (selectedServices.includes(MY_SQL)) {
    dockerComposeContent += `
    mysql:
      # Add MySQL service configuration here
  `;
  }

    if (selectedServices.includes('minio')) {
      dockerComposeContent += `
    minio:
      # Add Minio service configuration here
  `;
    } */

  // Write docker-compose.yml with the selected services
  fs.writeFileSync(dockerComposePath, dockerComposeContent);

  displaySuccessMessage('Vail successfully initialized.');
};

module.exports = { initCommand };
