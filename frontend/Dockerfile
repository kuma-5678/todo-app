FROM node:lts-slim

WORKDIR /front

COPY package*.json ./
RUN npm install

COPY . .

ENV CI=true

CMD ["npm", "start"]