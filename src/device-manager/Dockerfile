FROM node:current-slim

WORKDIR /usr/m-device-manager
COPY package.json .
RUN npm install

#EXPOSE ${DEVICE_MANAGER_PORT}
CMD ["npm", "start"]

COPY . .