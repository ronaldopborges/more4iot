FROM node:current-slim

WORKDIR /usr/m-device-manager
COPY package.json .
RUN npm install

CMD ["npm", "start"]

COPY . .