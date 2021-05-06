FROM node:current-slim

WORKDIR /usr/m-data-manager
COPY package.json .
RUN npm install

CMD ["npm", "start"]

COPY . .