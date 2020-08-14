# Development
FROM node:12.16.0-alpine AS development

WORKDIR /home/node

ENV NODE_ENV development

USER node

# Set global npm dependencies to be stored under the node user directory
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

CMD [ "npm", "run", "start:watch" ]

# Production
FROM development AS production
ENV NODE_ENV production
RUN npm ci
CMD [ "node", "app" ]
