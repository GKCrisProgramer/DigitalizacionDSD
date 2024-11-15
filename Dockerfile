FROM node:20-alpine as builder

WORKDIR /app
COPY . /app

RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration production

FROM nginx:1.27.1

COPY --from=builder /app/dist/digitalizacion/browser /usr/share/nginx/html
