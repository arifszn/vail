import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import {
  RED_COLOR_CODE,
  RESET_COLOR_CODE,
  GREEN_COLOR_CODE,
} from '../constants/color-codes.mjs';

export const displayErrorMessage = (message) => {
  console.log(`${RED_COLOR_CODE}${message}${RESET_COLOR_CODE}`);
};

export const displaySuccessMessage = (message) => {
  console.log(`${GREEN_COLOR_CODE}${message}${RESET_COLOR_CODE}`);
};

export const writeDockerComposeFileWithService = (
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

  const selectedServicesWithVolume = availableVolumes.filter((volume) =>
    selectedServices.includes(volume),
  );

  if (selectedServicesWithVolume.length === 0) {
    // Remove volumes if no services are selected
    delete parsedCompose.volumes;
  } else {
    // Add selected volumes to the volumes section
    selectedServicesWithVolume.forEach((volume) => {
      if (!(volume in parsedCompose.volumes)) {
        parsedCompose.volumes[`vail-${volume}`] = { driver: 'local' };
      }
    });
  }

  // Add selected services as dependencies of the app service
  if (selectedServices.length > 0) {
    if (!parsedCompose.services.app.depends_on) {
      parsedCompose.services.app.depends_on = [];
    }
    selectedServices.forEach((service) => {
      if (!parsedCompose.services.app.depends_on.includes(service)) {
        parsedCompose.services.app.depends_on.push(service);
      }
    });
  }

  // Convert the JavaScript object back to YAML format
  const updatedComposeContent = yaml.dump(parsedCompose);

  // Write the updated YAML content to docker-compose.yml
  fs.writeFileSync(dockerComposePath, updatedComposeContent, 'utf8');
};
