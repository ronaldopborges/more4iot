FROM node:current-slim

WORKDIR /usr/m-action_communicator
COPY package.json .
RUN npm install

EXPOSE ${ACTION_COMMUNICATION_PORT}
CMD ["npm", "start"]

COPY . .