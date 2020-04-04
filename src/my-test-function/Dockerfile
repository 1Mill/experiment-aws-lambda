ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY index.js .

ARG PORT

ENV HOST ${HOST}
ENV PORT ${PORT}

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
