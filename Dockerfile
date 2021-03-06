FROM node:latest
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/core
RUN npm install
RUN npm run build
WORKDIR /usr/src/app
RUN mv client/build core/client
WORKDIR /usr/src/app/core
CMD [ "npm", "start" ]
