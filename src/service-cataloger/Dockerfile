FROM node:current-slim

RUN mkdir -p /usr/service-cataloger
WORKDIR /usr/service-cataloger

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "docker"]
