FROM node:current-slim

COPY package.json .
RUN npm install

COPY wait-for-rabbitmq.sh .
RUN chmod +x wait-for-rabbitmq.sh

COPY . .

CMD ["npm","run","docker"]
#CMD ["./wait-for-rabbitmq.sh", "npm", "run", "docker"]