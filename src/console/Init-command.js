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
    ports:
      - '\${APP_PORT:-3000}:3000'
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
