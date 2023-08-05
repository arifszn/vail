<br/>

<p align="center">
    <img src="https://github.com/arifszn/OneClick/assets/45073703/9cf1ade3-335e-4a95-87c7-75ec1c34d3ec" width="8%">
  <h1 align="center">Vail</h1>

  <h4 align="center">Dockerize Your JavaScript/TypeScript Apps Effortlessly.</h4>
</p>

## Introduction

**Vail** provides a Docker powered local development experience for JavaScript/TypeScript Apps that is compatible with macOS, Windows (WSL2), and Linux. Other than Docker, no software or libraries are required to be installed on your local computer before using Vail. Vail's simple CLI means you can start building your application with MySQL, PostgreSQL, Redis without any previous Docker experience.

#### Inspiration

Vail is inspired by [Laravel Sail](https://github.com/laravel/sail).

## Installation & Setup

You can install Vail using either NPM or Yarn.

### NPM

To install Vail via NPM, use the following command:

```sh
npm install vail
```

### Yarn

Alternatively, you can install via Yarn using this command:

```sh
yarn add vail
```

### Setup

After Vail has been installed, you may run the `vail init` command. This command will publish Vail's `docker-compose.yml` file to the root of your application:

```sh
./node_modules/.bin/vail init
```

### Starting Vail

After setting up Vail, you can start it by running the following command:

```sh
./node_modules/.bin/vail up
```

This command will start Vail and all the containers defined in your `docker-compose.yml` file.

### Stopping Vail

To stop all of the containers, you may simply press Control + C to stop the container's execution. Or, if the containers are running in the background, you may use the `stop` command:

```sh
./node_modules/.bin/vail stop
```

### Customization

Since Vail is just Docker, you are free to customize nearly everything about it. After the installation, you may wish to change the env values or change the image names in the `docker-compose.yml`` file. After doing so, rebuild your application's containers using the build command.

```sh
./node_modules/.bin/vail build --no-cache
```

### Executing Commands

Vail supports all Docker Compose commands. You can use them as you would normally do with Docker Compose.

And that's it! Vail is now installed and set up in your application. Enjoy coding!

## Support

<p>You can show your support by starring this project.</p>
<a href="https://github.com/arifszn/vail/stargazers">
  <img src="https://img.shields.io/github/stars/arifszn/vail?style=social" alt="Github Star">
</a>

## Contributing

We welcome any contributions, bug reports, and feature requests. Please see [contributing guide](https://github.com/arifszn/vail/blob/main/CONTRIBUTING.md) for more information.

## License

[MIT](https://github.com/arifszn/vail/blob/main/LICENSE)
