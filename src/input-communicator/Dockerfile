FROM node:current-slim

WORKDIR /usr/m-input-communicator
COPY package.json .
RUN npm install

CMD ["npm", "start"]

COPY . .