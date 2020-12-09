FROM node:current-slim

WORKDIR /usr/m-service-cataloger
COPY package.json .
RUN npm install

EXPOSE ${SERVICE_CATALOGER_PORT}
CMD ["npm", "start"]

COPY . .