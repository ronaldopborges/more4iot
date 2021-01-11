FROM node:current-slim

WORKDIR /usr/m-input-communicator
COPY package.json .
RUN npm install

#EXPOSE ${INPUT_COMMUNICATOR_PORT}
CMD ["npm", "start"]

COPY . .