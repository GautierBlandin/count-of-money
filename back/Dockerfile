FROM node

WORKDIR /app/

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run typeorm migration:run
RUN ts-node src/init.ts

CMD ["npm", "run", "dev"]