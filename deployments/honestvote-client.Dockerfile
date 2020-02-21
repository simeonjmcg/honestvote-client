# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8080

# install and cache app dependencies
RUN apk update
RUN apk upgrade
RUN apk add --no-cache bash git openssh
RUN git clone https://github.com/simeonjmcg/honestvote-client

WORKDIR /app/honestvote-client
RUN npm install

# start app
CMD npm run web
# CMD while true; do sleep 1000; done