FROM node:current-slim

WORKDIR /usr/m-service-registry
COPY package.json .
RUN npm install

#EXPOSE ${SERVICE_REGISTRY_PORT}
CMD ["npm", "start"]

COPY . .