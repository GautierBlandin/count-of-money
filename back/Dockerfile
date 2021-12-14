FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run typeorm migration:run
RUN ts-node src/init.ts

CMD ["npm", "run", "dev"]