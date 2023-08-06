FROM ubuntu:22.04

LABEL maintainer="Ariful Alam"

ARG VAIL_NODE_VERSION

WORKDIR /var/www/html

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y gnupg gosu curl ca-certificates zip unzip git \
    && apt-get update \
    && curl -sLS https://deb.nodesource.com/setup_$VAIL_NODE_VERSION.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /etc/apt/keyrings/yarn.gpg >/dev/null \
    && echo "deb [signed-by=/etc/apt/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install dependencies
COPY package.json ./
RUN cp package-lock.json ./ || true
RUN npm install

COPY node_modules/vail/runtimes/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

ENTRYPOINT ["start-container"]