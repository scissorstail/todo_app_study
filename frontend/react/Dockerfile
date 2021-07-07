FROM node:lts-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY ./frontend/react/package*.json ./
RUN npm install

COPY ./frontend/react ./

CMD ["npm", "start"]
