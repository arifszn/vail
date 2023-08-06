const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const {
  RED_COLOR_CODE,
  RESET_COLOR_CODE,
  GREEN_COLOR_CODE,
} = require('../constants/color-codes');

const displayErrorMessage = (message) => {
  console.log(`${RED_COLOR_CODE}${message}${RESET_COLOR_CODE}`);
};

const displaySuccessMessage = (message) => {
  console.log(`${GREEN_COLOR_CODE}${message}${RESET_COLOR_CODE}`);
};

const writeDockerComposeFileWithService = (
  selectedServices,
  availableVolumes,
) => {
  const dockerComposePath = path.resolve(process.cwd(), 'docker-compose.yml');

  // Read the current docker-compose.yml file
  const dockerComposeContent = fs.readFileSync(dockerComposePath, 'utf8');

  // Parse the YAML content into a JavaScript object
  const parsedCompose = yaml.load(dockerComposeContent);

  // Check if 'volumes' property exists in 'parsedCompose' object
  if (!parsedCompose.volumes) {
    parsedCompose.volumes = {};
  }

  // Add selected services to the services section
  selectedServices.forEach((service) => {
    if (!(service in parsedCompose.services)) {
      const serviceStubPath = `./node_modules/vail/stubs/${service}.stub`;
      const serviceStubContent = fs.readFileSync(serviceStubPath, 'utf8');

      const serviceStub = yaml.load(serviceStubContent);
      parsedCompose.services[service] = serviceStub[service];
    }
  });

  // Remove volumes if no services are selected
  if (selectedServices.length === 0) {
    delete parsedCompose.volumes;
  } else {
    // Add selected volumes to the volumes section
    availableVolumes.forEach((volume) => {
      if (!(volume in parsedCompose.volumes)) {
        parsedCompose.volumes[`vail-${volume}`] = { driver: 'local' };
      }
    });
  }

  // Convert the JavaScript object back to YAML format
  const updatedComposeContent = yaml.dump(parsedCompose);

  // Write the updated YAML content to docker-compose.yml
  fs.writeFileSync(dockerComposePath, updatedComposeContent, 'utf8');
};

module.exports = {
  displayErrorMessage,
  displaySuccessMessage,
  writeDockerComposeFileWithService,
};
