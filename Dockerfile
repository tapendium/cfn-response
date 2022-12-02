ARG NODE_VERSION=18
FROM node:${NODE_VERSION}
WORKDIR /workdir
COPY package.json package-lock.json /workdir/
RUN npm ci
