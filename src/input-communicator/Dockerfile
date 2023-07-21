FROM node:current-slim

RUN mkdir -p /usr/input-communicator
WORKDIR /usr/input-communicator

RUN npm install -g nodemon 

COPY package.json .
RUN npm install

COPY . .

CMD ["npm","run", "dev"]
