ARG NODE_VERSION
ARG PACKAGE_MANAGER

# Use the official Node.js base image for the desired version
FROM node:${NODE_VERSION}

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the package.json and package-lock.json (or yarn.lock) files to the container
COPY package*.json ./

# Install project dependencies
RUN {PACKAGE_MANAGER} install

# Copy the rest of the project files to the container
COPY . .

# Build the production version
RUN {PACKAGE_MANAGER} run build
