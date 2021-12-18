FROM node

WORKDIR /app/back

COPY ./back/package*.json ./
COPY ./back/ormconfig.json ./
COPY ./.env.prod ./
COPY ./wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh

RUN npm install \
        && npm install typescript -g
COPY ./back .

CMD ["npm", "run", "dev"]