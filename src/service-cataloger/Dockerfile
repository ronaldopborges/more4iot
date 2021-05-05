FROM node:current-slim

WORKDIR /usr/m-service-cataloger
COPY package.json .
RUN npm install

CMD ["npm", "start"]

COPY . .