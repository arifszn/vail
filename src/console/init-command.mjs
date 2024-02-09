import fs from 'fs';
import path from 'path';
import {
  displayErrorMessage,
  displaySuccessMessage,
  writeDockerComposeFileWithService,
} from '../utils/index.mjs';
import inquirer from 'inquirer';
import {
  NODE_VERSIONS,
  DEFAULT_NODE_VERSION,
  SERVICES,
  SERVICES_WITH_VOLUME,
  DEFAULT_SELECTED_SERVICES,
} from '../constants/services.mjs';

export const initCommand = async () => {
  const dockerComposePath = path.resolve(process.cwd(), 'docker-compose.yml');

  // Check if docker-compose.yml is already present
  if (fs.existsSync(dockerComposePath)) {
    const overwriteAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'docker-compose.yml already exists. Do you want to overwrite?',
        default: false,
      },
    ]);

    if (!overwriteAnswer.overwrite) {
      displayErrorMessage('Exiting...');
      process.exit(0);
    }
  }

  // Ask the user to select the Node.js version
  const nodeVersionAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'nodeVersion',
      message: 'Select Node.js version:',
      choices: NODE_VERSIONS,
      default: DEFAULT_NODE_VERSION,
    },
  ]);

  const selectedNodeVersion = nodeVersionAnswer.nodeVersion;

  // Ask the user to select the package manager
  const packageManagerAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Select your package manager:',
      choices: ['npm', 'yarn'],
      default: 'npm',
    },
  ]);

  const selectedPackageManager = packageManagerAnswer.packageManager;

  // Ask the user to input the server start command
  const serverCommandAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'command',
      message: `Enter the command to run your server (e.g., ${
        selectedPackageManager === 'yarn' ? 'yarn run dev' : 'npm run dev'
      }):`,
      default:
        selectedPackageManager === 'yarn' ? 'yarn run dev' : 'npm run dev',
    },
  ]);

  const serverStartCommand = serverCommandAnswer.command;

  // Ask the user to input the ports
  const portsAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'ports',
      message:
        'Enter the ports to be used for server, separated by comma (e.g., 3000,3001):',
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
      default: DEFAULT_SELECTED_SERVICES,
      pageSize: SERVICES.length,
    },
  ]);

  const selectedServices = servicesAnswer.services;

  let dockerfileLocation = `./node_modules/vail/runtimes/${selectedPackageManager}`;
  if (!fs.existsSync(dockerfileLocation)) {
    displayErrorMessage('No Dockerfile found.');

    process.exit(1);
  }

  let dockerComposeContent = `version: '3'
services:
  app:
    build:
      context: .
      dockerfile: ${dockerfileLocation}/Dockerfile
      args:
        VAIL_NODE_VERSION: ${selectedNodeVersion}
    command: ${serverStartCommand}
    ports:
      ${ports.map((port) => `- '${port}:${port}'`).join('\n      ')}
    volumes:
      - .:/var/www/html
    networks:
      - vail

networks:
  vail:
    driver: bridge
`;

  // Write docker-compose.yml
  fs.writeFileSync(dockerComposePath, dockerComposeContent);

  // Call writeDockerComposeFile function with selected services and volumes
  writeDockerComposeFileWithService(selectedServices, SERVICES_WITH_VOLUME);

  displaySuccessMessage('Vail successfully initialized.');
};
