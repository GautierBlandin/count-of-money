FROM node:16 as build-stage

WORKDIR /app/front
COPY ./front/package*.json ./
COPY ./front ./

RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/front/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]