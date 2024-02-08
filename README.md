<p align="center">
    <img src="https://github.com/arifszn/vail/assets/45073703/25c6ad3a-5992-4afd-9232-5e394b53927c" width="8%">
  <h1 align="center">Vail</h1>

  <h4 align="center">Dockerize Your JavaScript/TypeScript Apps Effortlessly.</h4>

  <p align="center">
    <a href="https://www.npmjs.com/package/vail">
      <img src="https://img.shields.io/npm/v/vail"/>
    </a>
    <a href="https://www.npmjs.com/package/vail">
      <img src="https://img.shields.io/npm/dt/vail"/>
    </a>
    <a href="https://github.com/arifszn/vail/issues">
      <img src="https://img.shields.io/github/issues/arifszn/vail"/>
    </a>
    <a href="https://github.com/arifszn/vail/stargazers">
      <img src="https://img.shields.io/github/stars/arifszn/vail"/>
    </a>
    <a href="https://github.com/arifszn/vail/blob/main/CONTRIBUTING.md">
      <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"/>
    </a>
    <a href="https://github.com/arifszn/vail/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/arifszn/vail"/>
    </a>
    <a href="https://www.buymeacoffee.com/arifszn">
      <img src="https://img.shields.io/badge/sponsor-buy%20me%20a%20coffee-yellow?logo=buymeacoffee"/>
    </a>
    <a href="https://twitter.com/intent/tweet?url=https://github.com/arifszn/vail&hashtags=javascript,nodejs,opensource,js,webdev,developers">
      <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Farifszn%2Fvail"/>
    </a>
  </p>
</p>

<p align="center">
  <img src="https://github.com/arifszn/vail/assets/45073703/b6f3bae6-62a4-45cf-8c15-1995f461a923" alt="Preview" width="60%"/>
  <br/>
  <img src="https://arifszn.netlify.app/assets/img/drop-shadow.png" width="50%" alt="Shadow"/>
</p>

## Introduction

**Vail** provides a Docker powered local development experience for JavaScript/TypeScript Apps that is compatible with macOS, Windows (WSL2), and Linux.

Other than Docker, no software or libraries are required to be installed on your local computer before using Vail. Vail's simple CLI means you can start building your application with MySQL, Adminer, MinIO and other services without any previous Docker experience.

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

## Installing for Existing Applications (without having Nodejs locally)

If you are developing an application with a team, you may not be the one that initially creates the application. Therefore, none of the application's node_module dependencies, including Vail, will be installed after you clone the application's repository to your local computer.

You may install the application's node_module dependencies by navigating to the application's directory and executing the following command. This command uses a small Docker container containing Nodejs to install the application's dependencies, including Vail:

```sh
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    node:20-slim \
    npm install vail
```

When using the `node:20-slim` image, you should use the same version of Nodejs that you plan to use for your application.

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

Since Vail is just Docker, you are free to customize nearly everything about it. After the installation, you may wish to change the env values or change the command to start your server in the `docker-compose.yml` file. After doing so, rebuild your application's containers using the build command.

```sh
./node_modules/.bin/vail build --no-cache
```

### Executing Commands

Vail supports all Docker Compose commands. You can use them as you would normally do with Docker Compose.

Additionally, you can use Vail to run any command within the context of your application's containers. For example, to check the Node.js version installed in your app container, you can run:

```sh
./node_modules/.bin/vail exec app node --version
```

### Configuring A Shell Alias

Instead of repeatedly typing `./node_modules/.bin/vail` to execute Vail commands, you may wish to configure a shell alias that allows you to execute Vail's commands more easily:

```sh
alias vail='[ -f vail ] && sh vail || sh node_modules/.bin/vail'
```

To make sure this is always available, you may add this to your shell configuration file in your home directory, such as ~/.zshrc or ~/.bashrc, and then restart your shell.

Once the shell alias has been configured, you may execute Vail commands by simply typing vail.

```sh
vail up
```

## Available Services

Vail supports the following services:

- [Multiple Node version](#multiple-node-version)
- [MySQL](#mysql)
- [Adminer](#adminer)
- [Redis](#redis)
- [MinIO](#minio)
- [Mailpit](#mailpit)
- [Meilisearch](#meilisearch)
- [Memcached](#memcached)
- [RabbitMQ](#rabbitmq)
- [PostgreSQL](#postgresql)
- [MariaDB](#mariadb)

### Multiple Node version

This service allows you to run your application with different Node.js versions without the need of installing them on your local machine. This gives you the flexibility of testing your application with various Node.js versions.

### MySQL

MySQL is a popular open-source relational database management system. Vail provides a pre-configured MySQL server.

The default config:

- Host: mysql
- Port: 3306
- Username: vail
- Password: password

### Adminer

Adminer is a full-featured database management tool. It allows you to access and manage your databases, not only MySQL but also PostgreSQL and many other relational databases are supported.

Adminer can be accessed at `http://localhost:8080` (default configuration).

![Adminer](https://github.com/arifszn/vail/assets/45073703/3ab55913-6869-4dd1-a55f-ec1e87385aba)

### Redis

Redis is an open-source in-memory data structure project implementing a distributed, in-memory key-value database with optional durability.

The default config:

- Port: 6379

### MinIO

MinIO delivers AWS S3 compatible high-performance object storage. It provides the ability to store large amounts of unstructured data. In Vail, a pre-configured MinIO server is included.

MinIO can be used to mock AWS S3 bucket in the local development environment. This is particularly handy while developing features that interact with S3 but you don't want to incur unnecessary AWS costs. To setup MinIO to act as an AWS S3 bucket:

1. Access the MinIO dashboard via `http://localhost:8900`.

   ![MinIO dashboard](https://github.com/arifszn/vail/assets/45073703/49e33577-7674-4eff-b585-1c9b04a38706)

2. Login using the MinIO root user and password provided in the Vail setup.

   The default credentials:

   - Username: vail
   - Password: password

3. Create a new bucket, which will act as your S3 bucket.
4. For your application, use the MinIO host, bucket name, access key, and secret key in place of the AWS S3 details.

For a more comprehensive guide on setting up MinIO and using it to simulate S3, refer to this [article](https://dev.to/arifszn/minio-mock-s3-in-local-development-4ke6).

### Mailpit

Mailpit is an email testing tool for developers. It acts as both an SMTP server, and provides a web interface to view all captured emails.

You can send your emails to Mailpit SMTP server at `localhost:1025` and view them at the Mailpit web UI at `http://localhost:8025`.

![Mailpit](https://github.com/arifszn/vail/assets/45073703/9968631f-454e-4af2-9d22-a2f1cfbe640b)

### Meilisearch

Meilisearch is an open-source search engine. It's a perfect fit for apps needing to deliver user-friendly, relevant and fast search.

The default config:

- Port: 7700

### Memcached

Memcached is a general-purpose distributed memory-caching system. It is often used to speed up dynamic database-driven websites by caching data and objects in RAM to reduce the number of times an external data source (such as a database or API) must be read.

The default config:

- Port: 11211

### RabbitMQ

RabbitMQ is an open-source message-queueing software also known as a message broker or queue manager.

The default config:

- Port: 5672
- Dashboard: `http://localhost:15672`

### PostgreSQL

PostgreSQL, also known as Postgres, is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.

The default config:

- Host: pgsql
- Port: 3306
- Username: vail
- Password: password

### MariaDB

MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system, which provides similar features and interface.

The default config:

- Host: mariadb
- Port: 3306
- Username: vail
- Password: password

## Support

<p>You can show your support by starring this project.</p>
<a href="https://github.com/arifszn/vail/stargazers">
  <img src="https://img.shields.io/github/stars/arifszn/vail?style=social" alt="Github Star">
</a>

## Contributing

We welcome any contributions, bug reports, and feature requests. Please see [contributing guide](https://github.com/arifszn/vail/blob/main/CONTRIBUTING.md) for more information.

## License

[MIT](https://github.com/arifszn/vail/blob/main/LICENSE)
