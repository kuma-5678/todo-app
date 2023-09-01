FROM node:lts-slim

WORKDIR /front

COPY package*.json fronted/app/todo-web
RUN npm install

COPY . .

ENV CI=true

CMD ["npm", "start"]