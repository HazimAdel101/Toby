FROM node:21.7.3-alpine

RUN npm i -g nodemon

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]