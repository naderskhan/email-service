FROM node:10

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY ./dist ./

EXPOSE 3000

CMD node index.js
