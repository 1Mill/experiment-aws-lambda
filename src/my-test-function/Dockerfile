FROM node:12-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ARG ${PORT}

ENV HOST ${HOST}
ENV PORT ${PORT}

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
