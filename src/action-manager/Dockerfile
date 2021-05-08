FROM node:current-slim

WORKDIR /usr/m-action-manager
COPY package.json .
RUN npm install

CMD ["npm", "start"]

COPY . .