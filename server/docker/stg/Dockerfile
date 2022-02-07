FROM node:14.18.1-alpine3.14
RUN echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache \
        git \
        yarn
WORKDIR /app
COPY ./ /app
WORKDIR /app/src
RUN yarn install
EXPOSE 8080
CMD ["yarn", "stg"]
