FROM node:alpine

RUN apk update

RUN npm -g i serverless serverless-offline

CMD [ "serverless", "offline" ]
