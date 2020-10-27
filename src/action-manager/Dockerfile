FROM node:current-slim

WORKDIR /usr/m-action-manager
COPY package.json .
RUN npm install

EXPOSE ${ACTION_MANAGER_PORT}
CMD ["npm", "start"]

COPY . .