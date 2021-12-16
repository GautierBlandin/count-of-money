FROM node:16

WORKDIR /app/front
COPY ./front/package*.json ./

RUN npm install
COPY ./front .

CMD ["yarn", "start"]