FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

COPY .env.example .env

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]