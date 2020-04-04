FROM node:12-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ENV HOST ${HOST}
ENV PORT ${PORT}

CMD [ "npm", "run", "start" ]
