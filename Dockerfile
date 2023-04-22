###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2023-05-22                                              ##
## version         : 3.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
ARG NODE_VERSION=18.15.0

FROM node:${NODE_VERSION} as build
WORKDIR /opt

RUN yarn set version berry

COPY .yarn ./.yarn/
COPY yarn.lock package.json tsconfig.json .yarnrc.yml nx.json .prettierrc ./

COPY packages/config/package.json ./packages/config/
COPY packages/server/package.json ./packages/server/
COPY packages/app/package.json ./packages/app/

RUN yarn install

COPY packages ./packages

RUN yarn build

RUN yarn workspaces focus --all --production

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /src
WORKDIR ${WORKDIR}

RUN apk update && apk add bash git curl
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN yarn set version berry
RUN npm install -g pm2

COPY ./processes.config.js ./
COPY .yarn/releases ./.yarn/releases
COPY yarn.lock package.json tsconfig.json .yarnrc.yml nx.json .prettierrc ./

COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/packages/config ./packages/config
COPY --from=build /opt/packages/app ./packages/app
COPY --from=build /opt/packages/server ./packages/server

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD npx pm2-runtime start ./processes.config.js --env production

