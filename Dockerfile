FROM node:18-alpine as builder
WORKDIR /fe
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
USER root
#RUN rm /etc/nginx/conf.d/default.conf
#RUN rm -rf /etc/nginx/conf.d/*

COPY ./conf/nginx.conf /etc/nginx/conf.d/

COPY --from=builder /fe/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
