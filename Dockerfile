ARG NODE_IMAGE=node:20-alpine

###### First Stage - Creating base ######
FROM $NODE_IMAGE as base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
RUN apk add -U --no-cache curl bash openssl 
WORKDIR /home/node/app

USER node
RUN mkdir tmp

###### Second Stage - Installing dependencies ######
FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

###### Third Stage - Building Stage ######
FROM dependencies AS build
RUN node ace build

###### Final Stage - Production ######
FROM base as production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --only=production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT

RUN npm run migrate