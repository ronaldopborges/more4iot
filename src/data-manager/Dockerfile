FROM node:current-slim

COPY package.json .
RUN npm install

CMD ["npm","run", "docker"]

COPY . .