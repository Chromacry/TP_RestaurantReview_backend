# syntax=docker/dockerfile:1
FROM node:18.9.0
ENV NODE_ENV=development
WORKDIR /server-app

COPY package.json /server-app/-app
# RUN npm install express
# RUN npm install -g nodemon

COPY . /server-app/