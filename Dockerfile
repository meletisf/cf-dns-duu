FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install

CMD while true; do npm start; done