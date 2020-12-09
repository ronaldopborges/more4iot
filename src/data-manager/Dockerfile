FROM node:current-slim

WORKDIR /usr/m-data-manager
COPY package.json .
RUN npm install

EXPOSE ${DATA_MANAGER_PORT}
CMD ["npm", "start"]

COPY . .