FROM node:current-slim

WORKDIR /usr/m-action_communicator
COPY package.json .
RUN npm install

CMD ["npm", "start"]

COPY . .