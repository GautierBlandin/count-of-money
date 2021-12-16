FROM node

WORKDIR /app/back

COPY ./back/package*.json ./
COPY ./back/ormconfig.json ./

RUN npm install \
        && npm install typescript -g
COPY ./back .

RUN tsc

#RUN npm run typeorm migration:run
#RUN ts-node src/init.ts

CMD ["npm", "run", "dev"]