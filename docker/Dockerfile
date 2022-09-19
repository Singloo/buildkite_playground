FROM node:16-alpine

RUN apk update \
    && apk add --no-cache bash bash-doc bash-completion

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./

ENTRYPOINT [ "/bin/sh" ]

RUN npm install