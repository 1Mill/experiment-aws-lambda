ARG TAG
FROM lambci/lambda:build-${TAG}

WORKDIR /app

COPY package.json .
RUN npm install

COPY index.js .

ARG PORT

ENV HOST ${HOST}
ENV PORT ${PORT}

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
